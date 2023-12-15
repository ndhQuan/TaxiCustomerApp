import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ButtonIcon({
  iconName,
  iconColor = "black",
  description,
  bgIcon,
}) {
  return (
    <Pressable
      style={{
        height: "80%",
        borderRadius: 25,
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 60,
          width: 60,
          borderRadius: 35,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bgIcon ? bgIcon : "#aca6a6",
          overflow: "hidden",
        }}
      >
        <Ionicons name={iconName} size={30} color={iconColor} />
      </View>
      <Text style={{ fontSize: 18 }}>{description}</Text>
    </Pressable>
  );
}
