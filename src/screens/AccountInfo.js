import { useLayoutEffect, useContext, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { accountInfo } from "../api/Auth";
import { AuthContext } from "../context/AuthContext";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { getJourneyLog } from "../api/TripHandler";

export default function AccountInfo() {
  const autCtx = useContext(AuthContext);
  const [account, setAccount] = useState({});
  const [history, setHistory] = useState([]);

  useLayoutEffect(() => {
    async function getAccountInfo() {
      const info = await accountInfo(autCtx.userToken, autCtx.userId);
      if (info) {
        setAccount(info);
      }
    }
    getAccountInfo();
  }, []);

  useLayoutEffect(() => {
    async function journeyLog() {
      const info = await getJourneyLog(autCtx.userToken, autCtx.userId, false);
      if (info) {
        setHistory(info);
      }
    }
    journeyLog();
  }, []);

  function renderHistory(itemData) {
    const item = itemData.item;
    // const backgroundColor = selectedId === item.id ? "#09c009" : "#da1";
    // const color = selectedId === item.id ? "white" : "black";
    return (
      <View style={[styles.gridItem]}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={() => {}}
        >
          <View style={styles.item}>
            <Fontisto name="taxi" size={24} color="#0e9b31" />
            <View style={styles.innerContainer}>
              <View style={{ width: 180 }}>
                <Text style={styles.title}>
                  {item.endAddr.split(",", 1)[0]}
                </Text>
              </View>
              <View>
                <Text style={[styles.title]}>
                  {item.totalPrice.toLocaleString("en-US")}đ
                </Text>
                <Text style={[styles.title]}>{item.distance} km</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/driver-avatar.jpg")}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
          <View style={{ paddingLeft: 20 }}>
            <Text style={{ fontWeight: "bold" }}>{account.name}</Text>
            <Text>{account.phoneNumber}</Text>
            <Text>{account.email}</Text>
          </View>
        </View>
        <Pressable>
          <Ionicons name="pencil" size={18} />
        </Pressable>
      </View>
      <View>
        <Text style={{ fontWeight: "bold", padding: 10 }}>Lịch sử cuốc xe</Text>
        <View>
          <FlatList
            data={history}
            renderItem={renderHistory}
            keyExtractor={(item) => item.id}
            // extraData={selectedId}
          />
        </View>
      </View>
    </View>
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
