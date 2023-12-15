import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import Map from "../components/Map";
import * as signalR from "@microsoft/signalr";
import { BASEAPI_URL, driverToGuest, guestToEnd } from "../utils/constant";
import { PaperProvider } from "react-native-paper";
import InfoModal from "../components/InfoModal";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { calculateInitialRegion } from "../utils/helper";
import { Marker, Polyline } from "react-native-maps";
import ButtonIcon from "../components/UI/ButtonIcon";
import CustomButton from "../components/CustomButton";

export default function TripProcessing({ navigation, route }) {
  const { taxiTypeId, startAddr, endAddr, startLat, startLng, endLat, endLng } =
    route.params;

  const [connection, setConnection] = useState(null);
  const [initialRegion, setInitialRegion] = useState();
  const [driverInfo, setDriverInfo] = useState();
  const [driverCoords, setDriverCoords] = useState();
  const [isPickedUp, setIsPickedUp] = useState(false);
  const [polyCoords, setPolyCoords] = useState(driverToGuest);
  const [notFoundDriver, setNotFoundDriver] = useState(false);
  const authCtx = useContext(AuthContext);
  const token = authCtx.userToken;
  const mapRef = useRef();
  const denied = useRef(null);

  useEffect(() => {
    const newconnection = new signalR.HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl(`${BASEAPI_URL}/hubs/journey`, {
        accessTokenFactory: () => token,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newconnection
      .start()
      .then(() => setConnection(newconnection))
      .catch((err) => console.error(err));

    return () => newconnection.stop();
  }, []);

  useEffect(() => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      connection.send(
        "SendBookingRequest",
        startAddr,
        startLat,
        startLng,
        endAddr,
        endLat,
        endLng,
        taxiTypeId
      );
      console.log("sendRequest");
      console.log(authCtx.userToken);
      connection.on(
        "ReceivedDriverInfo",
        function (name, phoneNumber, licensePlate) {
          setDriverInfo({
            name,
            phoneNumber,
            licensePlate,
          });
          console.log("setDriver");
        }
      );

      connection.on("NotFoundDriver", function () {
        setNotFoundDriver(true);
      });

      connection.on("ReceiveDenyResponse", function () {
        connection.send(
          "SendBookingRequest",
          startAddr,
          startLat,
          startLng,
          endAddr,
          endLat,
          endLng,
          taxiTypeId
        );
      });
    }
  }, [connection]);

  useEffect(() => {
    if (
      connection &&
      connection.state === signalR.HubConnectionState.Connected
    ) {
      connection.on("ReceivedDriverCoords", function (lat, lng) {
        setDriverCoords({
          lat,
          lng,
        });
        console.log("setDriver");
      });

      connection.on("ReceivedPickedupNotification", function () {
        setPolyCoords(guestToEnd);
        setIsPickedUp(true);
      });
    }
  }, [connection]);

  useEffect(() => {
    if (driverInfo && !isPickedUp) {
      mapRef.current.animateToRegion(calculateInitialRegion(polyCoords), 2000);
    } else if (driverInfo && isPickedUp) {
      mapRef.current.animateToRegion(calculateInitialRegion(polyCoords), 2000);
    }
  }, [driverInfo, isPickedUp]);

  console.log(driverCoords, "coords");

  function pressHandler() {
    setNotFoundDriver(false);
    connection.send("RefreshDeniedList");
    navigation.goBack();
  }
  return (
    <View style={{ flex: 1 }}>
      {!driverInfo && (
        <View style={styles.waitingInfoContainer}>
          {notFoundDriver && (
            <View>
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Hiện tại không tìm thấy xe phù hợp theo yêu cầu. Xin quý khách
                thông cảm và quay lại sau ít phút.
              </Text>
              <CustomButton label={"OK"} onPress={pressHandler} />
            </View>
          )}
          {!notFoundDriver && (
            <>
              <ActivityIndicator />
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  padding: 8,
                  fontSize: 16,
                }}
              >
                Đang tìm tài xế cho bạn
              </Text>
            </>
          )}
        </View>
      )}
      {driverInfo && (
        <View style={styles.driverInfoContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {!isPickedUp && (
              <ButtonIcon
                iconName={"close"}
                description="Hủy"
                bgIcon="red"
                iconColor="white"
              />
            )}

            <ButtonIcon
              iconName={"chatbox-ellipses-outline"}
              description="Chat"
              bgIcon="green"
              iconColor="white"
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image
              style={{ borderRadius: 50, width: 80, height: 80 }}
              source={require("../assets/driver-avatar.jpg")}
            />
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {driverInfo.name}
              </Text>
              <Text style={{ fontSize: 16 }}>{driverInfo.phoneNumber}</Text>
              <Text style={{ fontSize: 16 }}>{driverInfo.licensePlate}</Text>
            </View>
          </View>
        </View>
      )}
      <View style={{ height: "75%" }}>
        <Map
          mapRef={mapRef}
          region={{
            latitude: startLat,
            longitude: startLng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {driverCoords && (
            <>
              {!isPickedUp ? (
                <Marker
                  coordinate={{
                    latitude: driverCoords.lat,
                    longitude: driverCoords.lng,
                  }}
                />
              ) : (
                <Marker
                  coordinate={{
                    latitude: endLat,
                    longitude: endLng,
                  }}
                />
              )}

              <Polyline
                strokeWidth={8}
                strokeColor="#4b4ee7"
                coordinates={polyCoords.map((coord) => {
                  return {
                    latitude: coord[0],
                    longitude: coord[1],
                  };
                })}
              />
            </>
          )}
        </Map>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  waitingInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "30%",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 10,
    backgroundColor: "#d8d0d0",
    justifyContent: "center",
  },
  driverInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "30%",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 10,
    backgroundColor: "#da1",
    justifyContent: "center",
  },
});
