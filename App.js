import { useContext } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { View, Text, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./src/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

import React from "react";

// import AppNav from "./src/navigation/AppNav";
import { AuthProvider } from "./src/context/AuthContext";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import GetLocation from "./src/screens/GetLocation";
import Booking from "./src/screens/Booking";
import TripProcessing from "./src/screens/TripProcessing";
import Finish from "./src/screens/Finish";
import AccountInfo from "./src/screens/AccountInfo";

import OnboardingScreen from "./src/screens/OnboardingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterSreen";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function Home() {
  const authCtx = useContext(AuthContext);

  function logoutHandler() {
    authCtx.logout();
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => {
          return (
            <Pressable
              onPress={logoutHandler}
              style={{ flexDirection: "row", paddingRight: 20 }}
            >
              <Ionicons size={20} name="log-out" />
              <Text> Logout</Text>
            </Pressable>
          );
        },
        tabBarActiveBackgroundColor: "#09c009",
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: { color: "black", fontSize: 13 },
        headerTitle: "Welcome Guest",
      }}
    >
      <Tab.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="home" size={20} />;
          },
          tabBarLabel: () => {
            return <Text>Home</Text>;
          },
        }}
      />
      <Tab.Screen
        name="AccountInfo"
        component={AccountInfo}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="person" size={20} />;
          },
          tabBarLabel: () => {
            return <Text>Account</Text>;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  function logoutHandler() {
    authCtx.logout();
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => {
          return (
            <Pressable onPress={logoutHandler}>
              <Ionicons size={20} name="log-out" />
            </Pressable>
          );
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="GetTripInfo" component={GetLocation} />
      <Stack.Screen name="BookingTaxi" component={Booking} />
      <Stack.Screen
        name="TripProcessing"
        component={TripProcessing}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Finish" component={Finish} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {authCtx.isLogin ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function App() {
  return (
    <>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}

export default App;
