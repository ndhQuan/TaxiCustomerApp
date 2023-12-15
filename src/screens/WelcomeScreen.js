import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import Button from "../components/Button";
import { useEffect } from "react";
import { DecodePoly } from "../api/GoogleMap";

export default function WelcomeScreen({ navigation }) {
  function onBookingHandler() {
    navigation.navigate("GetTripInfo");
  }

  // useEffect(() => {
  //   console.log(
  //     DecodePoly(
  //       "c_baAoi`jSc@~@EBA?_Ai@Y\\ORCAa@Qo@Uq@UYKVo@JQDQ?G]UHOBSBY`@u@?CGGy@k@KKgByAq@k@@Cz@gAxAqBt@gAJW`B}DfBqEd@}Ab@mBNe@hAkEl@}Bp@uCz@aEj@oB`AoEl@_CXeADSHEd@c@`@QnFpAfBb@Z?PBdBZdAL~BNfBHl@?rHHpF@xMJ|AB\\LjGDh@CZ@PFPXDDYn@oA|Fc@nBe@|Ae@`BK|@Ez@?h@HnA?HXvAl@vBJZp@dCHVt@bE^jCPzD\\tJTjIBj@Ej@CRIHSLc@EcA[m@SG?YWAQKK}@w@GEeCf@AHABMNINCb@@T]Ja@LaAXPn@D@n@Q"
  //     )
  //   );
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Welcome, you are logged in
        </Text>
      </View>
      <View style={styles.feature}>
        <Button android_ripple={{ color: "#ccc" }} onPress={onBookingHandler}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Đặt xe</Text>
          </View>
        </Button>
        <Button android_ripple={{ color: "#ccc" }} style={{ flex: 1 }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Tài khoản</Text>
          </View>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  feature: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 30,
    marginTop: 20,
    // backgroundColor: "#ca1",
  },
  inputConten: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    flex: 1,
    justifyContent: "center",
  },
});
