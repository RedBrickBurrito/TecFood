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
  Pressable,
  Alert,
  TouchableOpacity,
  Platform,
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
          <ImageBackground
            source={require("../assets/InputField.png")}
            style={styles.input}
          >
            <TextInput
              id="name"
              style={styles.signup_text}
              onChangeText={(text) => setData({ ...data, name: text })}
              value={data.name}
              placeholder="Nombre"
            />
          </ImageBackground>
          <ImageBackground
            source={require("../assets/InputField.png")}
            style={styles.input}
          >
            <TextInput
              id="email"
              style={styles.signup_text}
              onChangeText={(text) => setData({ ...data, email: text })}
              value={data.email}
              placeholder="Email"
            />
          </ImageBackground>
          <ImageBackground
            source={require("../assets/InputField.png")}
            style={styles.input}
          >
            <TextInput
              id="password"
              style={styles.signup_text}
              onChangeText={(text) => setData({ ...data, password: text })}
              value={data.password}
              placeholder="Password"
            />
          </ImageBackground>
          <TouchableOpacity style={styles.submit_button} onPress={handleSubmit}>
            <Text style={styles.submit_text}>Registrar</Text>
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
    top: hp("25%"),
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
    top: hp("93%"),
    color: "#182a3a",
    fontFamily: "OpenSans_Regular",
    fontSize: 12,
    fontWeight: "400",
  },
  signup_form: {
    marginTop: "4%",
    alignSelf: "center",
    top: hp("-4%"),
    width: wp("100%"),
    height: hp("60%"),
    paddingTop: hp("3%"),
  },
  signup_text: {
    alignSelf: "center",
    alignItems: "center",
    width: wp("45%"),
    height: hp("3.2%"),
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "OpenSans_Regular",
    color: "#53687b",
    paddingTop: hp(".5%"),
    paddingLeft: wp("1.5%"),
  },
  submit_button: {
    alignSelf: "center",
    alignItems: "center",
    fontFamily: "OpenSans_Regular",
    fontSize: 20,
    top: hp("15%"),
    width: wp("35%"),
    backgroundColor: "#24da9d",
    borderRadius: 19,
    height: hp("6%"),
    elevation: Platform.OS === "android" ? 23 : 0,
    shadowColor: Platform.OS === "ios" ? "#81c7af" : null,
    shadowOffset: Platform.OS === "ios" ? { width: 10, height: 10 } : null,
  },
  submit_text: {
    padding: "7%",
    textAlign: "center",
  },
  boldText: {
    color: "#24da9d",
    fontFamily: "OpenSans_Bold",
    fontWeight: "700",
  },
  input: {
    alignSelf: "center",
    top: "20%",
    width: wp("53%"),
    height: hp("5%"),
    alignItems: "flex-start",
    paddingLeft: wp("3%"),
    paddingTop: hp("0.5"),
    marginBottom: hp("3%"),
    marginTop: hp("1%"),
  },
});

export default SignUp;
