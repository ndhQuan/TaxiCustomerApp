import { View, Text, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";

export default function Finish({ navigation, route }) {
  const driverName = route.params.driverName;
  const licensePlate = route.params.licensePlate;

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <View style={{ paddingTop: 20 }}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          Chuyến đi đã hoàn thành. Cám ơn bạn đã sử dụng dịch vụ của chúng tôi
        </Text>
      </View>
      <View
        style={{
          width: "80%",
          paddingVertical: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 20,
        }}
      >
        <Image
          source={require("../assets/driver-avatar.jpg")}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{driverName}</Text>
          <Text style={{ fontSize: 16 }}>{licensePlate}</Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="star-outline" size={25} />
            <Ionicons name="star-outline" size={25} />
            <Ionicons name="star-outline" size={25} />
            <Ionicons name="star-outline" size={25} />
            <Ionicons name="star-outline" size={25} />
          </View>
        </View>
      </View>
      <View>
        <CustomButton
          label={"HOÀN TẤT"}
          onPress={() => navigation.popToTop()}
        />
      </View>
    </View>
  );
}
