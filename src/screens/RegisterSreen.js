import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import InputField from "../components/InputField";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import CustomButton from "../components/CustomButton";
import { signUp } from "../api/Auth";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState();
  const [email, setEmail] = useState("");
  const [visibleError, setVisibleError] = useState(false);
  const confirmPassword = useRef();

  async function registerHandler() {
    if (confirmPassword.current != password) {
      setVisibleError(true);
      return;
    }
    await signUp(name, email, phoneNumber, password);
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{
          paddingHorizontal: 25,
          paddingVertical: 100,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Register
        </Text>

        <InputField
          label={"Full Name"}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={name}
          onChangeText={(enteredName) => setName(enteredName)}
        />

        <InputField
          label={"Phone number"}
          icon={
            <MaterialIcons
              name="phone-android"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="number-pad"
          value={phoneNumber}
          onChangeText={(enteredPhone) => setPhoneNumber(enteredPhone)}
        />

        <InputField
          label={"Email"}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={email}
          onChangeText={(enteredEmail) => setEmail(enteredEmail)}
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          value={password}
          onChangeText={(enteredPass) => setPassword(enteredPass)}
        />

        <InputField
          label={"Confirm Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          value={confirmPassword.current}
          onChangeText={(enteredConfirm) =>
            (confirmPassword.current = enteredConfirm)
          }
        />
        <Text style={{ display: visibleError ? "flex" : "none", color: "red" }}>
          ConfirmPassword not matched
        </Text>
        <CustomButton label={"Register"} onPress={registerHandler} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "#daa520", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
