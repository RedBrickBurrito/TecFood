import React from "react";
import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  StatusBar,
  Text,
  ClippingRectangle,
} from "react-native";

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
        style={styles.rectangle_form}
        source={require("../assets/Rectangle_3.png")}
      >
        <Image
          style={styles.signup_form}
          source={require("../assets/SignUpForm.png")}
        ></Image>
      </ImageBackground>
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
    position: "absolute",
    top: 0,
    left: 0,
    marginLeft: 140,
    marginTop: 95,
    width: 82,
    height: 86,
  },
  header_vector: {
    left: -110,
    top: -40,
    width: 627,
    height: 280,
    shadowColor: "#7ba1a2",
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 35,
  },
  header_text: {
    position: "absolute",
    top: 210,
    left: 80,
    width: "100%",
    height: 55,
    color: "#182a3a",
    fontFamily: "Coolvetica",
    fontSize: 45,
    fontWeight: "400",
    lineHeight: 54,
  },
  signup_form: {
    position: "absolute",
    top: -0,
    left: -42,
    width: 280,
    height: 300,
    shadowColor: "#ffffff",
    shadowOffset: { width: -24, height: -24 },
    shadowRadius: 42,
    borderRadius: 29,
    backgroundColor: "#f7fbfb",
  },
  rectangle_form: {
    position: "absolute",
    top: 280,
    left: 50,
    width: 330,
    height: 450,
    shadowColor: "#ffffff",
    shadowOffset: { width: -24, height: -2 },
    shadowRadius: 42,
  },
  mainText: {
    position: "absolute",
    textAlign: "center",
    top: 690,
    left: 86,
    width: 203,
    height: 17,
    color: "#182a3a",
    fontFamily: "OpenSans_Regular",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 14.4,
  },
  boldText: {
    color: "#24da9d",
    fontFamily: "OpenSans_Bold",
    fontWeight: "700",
  },
});

export default SignUp;
