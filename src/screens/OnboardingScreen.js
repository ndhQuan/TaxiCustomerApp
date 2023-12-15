import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const OnboardingScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#daa520",
          padding: 20,
          width: "90%",
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Let's Begin
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
