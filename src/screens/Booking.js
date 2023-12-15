import {
  View,
  FlatList,
  Pressable,
  Button,
  Text,
  StyleSheet,
} from "react-native";
import Map from "../components/Map";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { getTripBookingInfo } from "../api/TripHandler";
import { getGeocode, getDirections } from "../api/GoogleMap";
import { Fontisto } from "@expo/vector-icons";
import { region } from "../utils/constant";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Polyline, Marker } from "react-native-maps";
import { calculateInitialRegion } from "../utils/helper";
import { guestToEnd } from "../utils/constant";

export default function Booking({ navigation, route }) {
  // const start = route.params.start;
  // const end = route.params.end;

  const curLat = route.params.currentLat;
  const curLng = route.params.currentLng;
  const startAddr =
    "54/9B/7 Đường số 7, Phường 10, Gò Vấp, Thành phố Hồ Chí Minh, Vietnam";
  const endAddr =
    "Sân bay quốc tế Tân Sơn Nhất, Trường Sơn, Tân Bình, Thành phố Hồ Chí Minh, Việt Nam";

  const [initialRegion, setInitialRegion] = useState();
  const [taxiTypeList, setTaxiTypeList] = useState([]);
  const [coords, setCoords] = useState(guestToEnd);
  const [selectedId, setSelectedId] = useState();
  const autCtx = useContext(AuthContext);

  const selectedTypeId = useRef();
  const distance = useRef();

  function onChooseHandler(id) {
    selectedTypeId.current = id;
    setSelectedId(id);
  }

  // API Get Directions (Blocked)
  /* useLayoutEffect(() => {
  //   getDirections(start, end)
  //     .then((obj) => {
  //       distance.current = obj.distance;
  //       setCoords(obj.coords);
  //     })
  //     .catch((err) => console.log("Something went wrong"));
   }, []);*/

  useLayoutEffect(
    function () {
      async function getTaxiTypeList() {
        try {
          const taxiTypeList = await getTripBookingInfo(autCtx.userToken);
          if (taxiTypeList.length > 0) {
            setTaxiTypeList(taxiTypeList);
          }
          console.log(taxiTypeList);
        } catch {
          console.log("asp.net error");
        }
      }
      getTaxiTypeList();
    },
    [setTaxiTypeList, setInitialRegion]
  );

  useEffect(() => {
    const region = calculateInitialRegion(coords);
    console.log(region, "region");
    setInitialRegion(region);
  }, []);

  // console.log(initialRegion);

  function renderTaxiType(itemData) {
    const item = itemData.item;
    const backgroundColor = selectedId === item.id ? "#09c009" : "#da1";
    const color = selectedId === item.id ? "white" : "black";
    return (
      <View style={[styles.gridItem, { backgroundColor }]}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={() => onChooseHandler(item.id)}
        >
          <View style={styles.item}>
            <Fontisto name="taxi" size={24} color={color} />
            <View style={styles.innerContainer}>
              <Text style={[styles.title, { color }]}>
                Xe {item.numberOfSeat} chỗ
              </Text>
              <Text style={[styles.title, { color }]}>
                {Math.floor(5200 * item.cost * 0.001).toLocaleString("en-US")}đ
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }

  function onBookingHandler() {
    navigation.navigate("TripProcessing", {
      startAddr,
      startLat: curLat,
      startLng: curLng,
      endAddr,
      endLat: 10.8165899,
      endLng: 106.6650496,
      taxiTypeId: selectedId,
    });
  }

  return (
    // <PaperProvider>
    //   <InfoModal>
    //     <FlatList
    //       data={taxiTypeList}
    //       renderItem={renderTaxiType}
    //       keyExtractor={(item) => item.id}
    //     />
    //     <Button title="ĐẶT XE" onPress={onBookingHandler} />
    //   </InfoModal>
    <View style={{ flex: 1 }}>
      <View style={styles.bookingInfoContainer}>
        <FlatList
          data={taxiTypeList}
          renderItem={renderTaxiType}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
        <View style={{ marginVertical: 16, paddingHorizontal: 20 }}>
          <Button
            title="ĐẶT XE"
            onPress={onBookingHandler}
            disabled={!selectedId}
          />
        </View>
      </View>
      <View style={{ height: "75%" }}>
        <Map region={initialRegion}>
          <Marker coordinate={{ latitude: 10.82884, longitude: 106.66659 }} />
          <Marker
            coordinate={{ latitude: 10.8165899, longitude: 106.6650496 }}
          />
          <Polyline
            strokeWidth={8}
            strokeColor="#4b4ee7"
            coordinates={coords.map((point, index) => {
              return {
                latitude: point[0],
                longitude: point[1],
              };
            })}
          />
        </Map>
      </View>
    </View>
    // </PaperProvider>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 10,
    height: 80,
    overflow: "hidden",
    justifyContent: "center",
    borderRadius: 20,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-around",
    padding: 14,
    alignItems: "center",
    flexDirection: "row",
    width: "70%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  bookingInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "35%",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 10,
    backgroundColor: "#da1",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
});
