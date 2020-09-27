import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button, Card, Input, Icon } from "@ui-kitten/components";
<<<<<<< HEAD
import { registerUser } from "../../services/SignUpService";
=======
import { registerUser } from '../../services/SignUpService'
import ProductPage from "./ProductPage";
>>>>>>> 6ff5034... Modified SignUp for ProductPage testing & fixed ProductPage errors

function SignUp(props) {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState({
    email: "basic",
    password: "basic",
    name: "basic",
  });
  const [validated, setValidated] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
<<<<<<< HEAD
<<<<<<< HEAD
  const mounted = useRef()
=======
  const [visible, setVisible] = useState(false);
>>>>>>> 6ff5034... Modified SignUp for ProductPage testing & fixed ProductPage errors
=======
>>>>>>> 5957549... Finished ProductPage styling, restored SignUp

  const handleSubmit = () => {
    if (validated) {
      registerUser(data)
        .then((res) => {
          console.log(res);

          if (res.status == "201") {
            Alert.alert("Success", res.message, [
              {
                text: "Understood",
                onPress: () => props.navigation.navigate("SignIn"),
              },
            ]);
          } else {
            Alert.alert("Error", res.message, [
              {
                text: "Understood",
                onPress: () => props.navigation.navigate("SignIn"),
              },
            ]);
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Error", error.message, [
            { text: "Understood", onPress: () => console.log("need to retry") },
          ]);
        });
    } else {
      console.log("is not validated");
      console.log(status);
    }
  };

  const validate = () => {
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    const emailRegExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;

    setValidated(true);

    if (data.name === "") {
      setStatus((prevState) => {
        return { ...prevState, name: "danger" };
      });
      setValidated(false);
    } else {
      setStatus((prevState) => {
        return { ...prevState, name: "success" };
      });
    }

    if (!passwordRegExp.test(data.password)) {
      setStatus((prevState) => {
        return { ...prevState, password: "danger" };
      });
      setValidated(false);
    } else {
      setStatus((prevState) => {
        return { ...prevState, password: "success" };
      });
    }

    if (!emailRegExp.test(data.email)) {
      setStatus((prevState) => {
        return { ...prevState, email: "danger" };
      });
      setValidated(false);
    } else {
      setStatus((prevState) => {
        return { ...prevState, email: "success" };
      });
    }
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  useEffect(() => {
    if(mounted.current)
      validate()
  }, [data])

  useEffect(() => {
    mounted.current = true
  }, [])

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
<<<<<<< HEAD
      <Text style={styles.header_text}>Sign Up</Text>

=======
      <Text style={styles.header_text}>Registrarse</Text>
>>>>>>> 5957549... Finished ProductPage styling, restored SignUp
      <Card style={styles.card}>
        <Input
          placeholder="Full name"
          value={data.name}
          onChangeText={value => setData(prevState => ({...prevState, name: value}))}
          style={styles.submit_text}
          status={status.name}
          textStyle={styles.input_text}
        />
        <Input
          placeholder="E-mail"
          value={data.email}
          onChangeText={value => setData(prevState => ({...prevState, email: value}))}
          style={styles.submit_text}
          status={status.email}
          textStyle={styles.input_text}
        />
        <Input
          placeholder="Password"
          value={data.password}
          onChangeText={value => setData(prevState => ({...prevState, password: value}))}
          style={styles.submit_text}
          status={status.password}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          textStyle={styles.input_text}
          caption="It must contain a minimum of 8 characters, 1 number, 1 uppercase and 1 lowercase letter."
        />
        <Button
          onPress={handleSubmit}
          style={validated ? styles.submit_button : styles.disabled_button}
          status="primary"
          size="medium"
          disabled={validated ? false : true}
        >
          Submit
        </Button>
        <Button
          onPress={() => props.navigation.navigate("Main")}
          style={styles.submit_button}
          status="primary"
          size="medium"
        >
          Go To Main Screen
        </Button>
      </Card>
      <Text style={styles.mainText}>
        ¿Already have an account?{" "}
        <Text
          style={styles.boldText}
          onPress={() => props.navigation.navigate("SignIn")}
        >
          Sign In
        </Text>
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
    top: hp("1%"),
    elevation: 20,
    fontSize: 20,
    borderRadius: 19,
    fontFamily: "OpenSans_Regular",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
  },
  disabled_button: {
    alignSelf: "center",
    alignItems: "center",
    top: hp("1%"),
    fontSize: 20,
    borderRadius: 19,
    fontFamily: "OpenSans_Regular",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
  },
  submit_text: {
    padding: "7%",
    borderRadius: 20,
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
    backgroundColor: "#f7fbfb",
    borderRadius: 29,
    shadowColor: "#dbebeb",
    shadowOffset: { width: 24, height: 24 },
    shadowRadius: 42,
    elevation: 20,
  },
  input_text: {
    color: "#172A3A",
  },
});

export default SignUp;
