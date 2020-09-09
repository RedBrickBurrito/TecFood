import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  StatusBar,
  Text,
  TextInput,
  ClippingRectangle,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function SignUp(props) {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = () => {
    console.log(data);
  };

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
        style={styles.signup_form}
        source={require("../assets/SignUpForm.png")}
      >
        <View id="form">
          <TextInput
            id="name"
            style={styles.signup_text}
            onChangeText={(text) => setData({ ...data, name: text })}
            value={data.name}
            placeholder="Name"
            placeholderTextColor="#D50000"
          />
          <TextInput
            id="email"
            style={styles.signup_text}
            onChangeText={(text) => setData({ ...data, email: text })}
            value={data.email}
            placeholder="Email"
            placeholderTextColor="#D50000"
          />
          <TextInput
            id="password"
            style={styles.signup_text}
            onChangeText={(text) => setData({ ...data, password: text })}
            value={data.password}
            placeholder="Password"
          />
          <TouchableOpacity onPress={handleSubmit}>
            <ImageBackground
              source={require("../assets/Button.png")}
              style={styles.submit_button}
            >
              <Text>Registrar</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
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
    width: 85.6,
    height: 89.5,
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
    top: hp("22%"),
    width: wp("100%"),
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
    width: wp("100%"),
    height: hp("60%"),
    paddingTop: hp("3%"),
  },
  signup_text: {
    alignSelf: "center",
    width: wp("60%"),
    height: hp("5%"),
    padding: hp("3%"),
    marginTop: hp("3%"),
    borderRadius: 25,
    //boxShadow: "6px 0px 7px lightgrey inset, 0px 6px 7px lightgrey inset",
    textAlignVertical: "center",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "OpenSans_Regular",
    color: "#53687b",
    lineHeight: 14.4,
  },
  submit_button: {
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 25,
    fontFamily: "OpenSans_Regular",
    fontSize: 20,
    width: wp("50%"),
    height: hp("10%"),
    top: "30%",
  },
  boldText: {
    color: "#24da9d",
    fontFamily: "OpenSans_Bold",
    fontWeight: "700",
  },
});

export default SignUp;
