import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import {
  Alert,
  Pressable,
  Text,
  View,
  StyleSheet,
  TextInput,
  Modal as OriginalModal,
  Button,
  Image,
} from "react-native";
import { PaperProvider } from "react-native-paper";
import { useLayoutEffect, useEffect, useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getGeocode } from "../api/GoogleMap";

import SearchPlace from "../components/SearchPlaceAuto";
import InfoModal from "../components/InfoModal";
import Map from "../components/Map";
import { calculateInitialRegion } from "../utils/helper";

import { AuthContext } from "../context/AuthContext";

export default function GetLocation({ navigation }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState();
  const [placeIdStart, setPlaceIdStart] = useState(
    "ChIJ2U3J2QUpdTER8vO_6Unx4Fk"
  );
  const [placeIdEnd, setPlaceIdEnd] = useState("ChIJnZ-oGhEpdTER8ycbqsCc8Ng");
  const [permission, setPermission] = useState(true);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 10.82302,
    longitude: 106.62965,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.04497,
  });
  const authCtx = useContext(AuthContext);
  console.log(authCtx.userId, "authctx");

  function InitialScreen() {
    return (
      <PaperProvider>
        {/* <InfoModal>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <ActivityIndicator />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                padding: 8,
                fontSize: 16,
              }}
            >
              Đang tìm vị trí của bạn
            </Text>
          </View>
        </InfoModal> */}
        <Map region={initialRegion} />
      </PaperProvider>
    );
  }

  function getTripInfo(start, end) {
    setIsOpenModal(false);
    navigation.navigate("BookingTaxi", {
      start,
      end,
      currentLat: currentLocation.lat,
      currentLng: currentLocation.lng,
    });
  }

  function openModal() {
    setIsOpenModal(true);
  }

  useEffect(() => {
    async function getCurrentCoord() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        setPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        accuracy: Location.Accuracy.High,
      });
      console.log(location, "location");
      const newIniRegion = calculateInitialRegion(
        [[location.coords.latitude, location.coords.longitude]],
        true
      );
      setInitialRegion(() =>
        calculateInitialRegion(
          [[location.coords.latitude, location.coords.longitude]],
          true
        )
      );
      console.log(newIniRegion, "new");
      console.log(initialRegion, "ini");

      setCurrentLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    }
    const findCoord = setTimeout(getCurrentCoord, 2000);
    return () => clearTimeout(findCoord);
    // getCurrentCoord();
  }, []);

  console.log(currentLocation, "current");

  if (!currentLocation && permission) {
    return <InitialScreen></InitialScreen>;
  }
  return (
    <View style={styles.mapContainer}>
      <OriginalModal visible={isOpenModal} animationType="slide">
        <View style={styles.modalContainer}>
          <SearchPlace
            placeholder="Vị trí hiện tại"
            current={currentLocation}
            onGetLocation={setPlaceIdStart}
          />
          <SearchPlace
            placeholder="Nơi cần đến"
            isEnd={true}
            onGetLocation={setPlaceIdEnd}
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ marginHorizontal: 20 }}>
              <Button
                title="XEM THÔNG TIN CHUYẾN ĐI"
                onPress={() => getTripInfo(placeIdStart, placeIdEnd)}
                disabled={!placeIdStart || !placeIdEnd}
              />
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <Button title="Trở lại" onPress={() => setIsOpenModal(false)} />
            </View>
          </View>
        </View>
      </OriginalModal>
      <Image style={styles.imageStyle} source={require("../assets/city.jpg")} />
      <View
        style={{
          height: 250,
          width: "90%",
          padding: 20,
          backgroundColor: "rgb(221, 169, 13)",
          borderRadius: 20,
          zIndex: 10,
        }}
      >
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
        ></MapView>
        <Pressable onPress={openModal}>
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                backgroundColor: "#e4d0ff",
                justifyContent: "center",
                height: 40,
              }}
            >
              <Ionicons name="navigate-circle" size={20} />
            </View>
            <Text style={[styles.textInput, { justifyContent: "center" }]}>
              Tìm điểm đến
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#1daf",
  },
  map: {
    width: "100%",
    height: 120,
    overflow: "hidden",
    borderRadius: 20,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00BCD4",
    height: 300,
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    // marginTop: 80,
    marginLeft: 40,
  },
  textInput: {
    backgroundColor: "#e4d0ff",
    paddingLeft: 16,
    paddingVertical: 10,
    height: 40,
    fontSize: 15,
    flex: 1,
  },

  search: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#311b6b",
  },
  imageStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "50%",
    width: "100%",
  },
});
