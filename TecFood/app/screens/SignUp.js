import React from "react";
import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  StatusBar,
  Text,
  ClippingRectangle,
  Dimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function SignUp(props) {
  return (
    <View style={styles.background}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={"#044244"}
      />
      <ImageBackground
        style={styles.header_vector}
        source={require("../assets/Header_SignUp.png")}
      >
        <Image
          style={styles.tecfoodslogo}
          source={require("../assets/Tec_Foods_Logo.png")}
        />
      </ImageBackground>
      <Text style={styles.header_text}>Registrarse</Text>
      <ImageBackground
        source={require("../assets/SignupForm.png")}
        style={styles.signup_form}
      />
      <Text style={styles.mainText}>
        ¿Ya tienes una cuenta?{" "}
        <Text style={styles.boldText}>Inicia sesión</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#f9fefe",
  },
  tecfoodslogo: {
    width: wp("20.35"),
    height: hp("11.4"),
    marginLeft: wp("5%"),
  },
  header_vector: {
    alignItems: "flex-start",
    justifyContent: "center",
    top: hp("-6%"),
    width: wp("100%"),
    height: hp("35%"),
  },
  header_text: {
    position: "absolute",
    textAlign: "center",
    top: hp("26%"),
    width: wp("100%"),
    height: hp("100%"),
    color: "#182a3a",
    fontFamily: "Coolvetica",
    fontSize: 45,
    fontWeight: "400",
  },

  mainText: {
    position: "absolute",
    alignSelf: "center",
    textAlign: "center",
    top: "90%",
    color: "#182a3a",
    fontFamily: "OpenSans_Regular",
    fontSize: 12,
    fontWeight: "400",
  },
  signup_form: {
    alignSelf: "center",
    top: hp("-4%"),
    bottom: hp("30%"),
    width: wp("95%"),
    height: hp("60%"),
  },
  boldText: {
    color: "#24da9d",
    fontFamily: "OpenSans_Bold",
    fontWeight: "700",
  },
});

export default SignUp;
