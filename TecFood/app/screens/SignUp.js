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
import { Button, Card, Input } from '@ui-kitten/components'

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

      <Card style={styles.card}>
        <Input
          placeholder="Name"
          value={data.name}
          onChangeText={value => setData({...data, name: value})}
          style={styles.submit_text}
          status="basic"
          textStyle={styles.input_text}
        />
        <Button onPress={handleSubmit} style={styles.submit_button}>
          Boton de Kitten
        </Button>
      </Card>
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
  submit_button: {
    alignSelf: "center",
    alignItems: "center",
    fontFamily: "OpenSans_Regular",
    fontSize: 20,
    backgroundColor: "#24da9d",
    borderRadius: 19,
  },
  submit_text: {
    padding: "7%",
    borderRadius: 20,
    backgroundColor: "#f9fefe",
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
  card: {
    alignSelf: "center",
    width: wp("75%"),
    height: hp("50%"),
    backgroundColor: '#f7fbfb',
    borderRadius: 29,
    shadowColor: '#dbebeb',
    shadowOffset: { width: 24, height: 24 },
    shadowRadius: 42,
    elevation: 20,
  },
  input_text: {
    color: "blue",
  }
});

export default SignUp;
