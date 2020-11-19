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
import { useFocusEffect } from "@react-navigation/native";
import SyncStorage from "sync-storage";
import jwt_decode from "jwt-decode";
import { loginHandler } from "../../services/LoginService";

function SignIn(props) {
  const [data, setData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({
    email: "basic",
    password: "basic",
  });
  const [validated, setValidated] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const mounted = useRef();

  const handleSubmit = () => {
    if (validated) {
      loginHandler(data)
        .then((response) => {
          if (response.status == 200) {
            const token = response.token;
            const decodedToken = jwt_decode(token);

            SyncStorage.set("USER_TOKEN", token);
            SyncStorage.set("USER", decodedToken.email);

            Alert.alert("Success", response.message, [
              {
                text: "Understood",
                onPress: () => props.navigation.navigate("Drawer"),
              },
            ]);
          } else {
            Alert.alert("Error", response.message, [
              {
                text: "Understood",
              },
            ]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const validate = () => {
    const emailRegExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;

    setValidated(true);

    if (data.password == "") {
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
    if (mounted.current) validate();
  }, [data]);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useFocusEffect(() => {
    const user = SyncStorage.get("USER_TOKEN");

    if(user) props.navigation.navigate("Drawer");
  });

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
      <Text style={styles.header_text}>Sign In</Text>

      <Card style={styles.card}>
        <Input
          placeholder="E-mail"
          value={data.email}
          onChangeText={(value) =>
            setData((prevState) => ({ ...prevState, email: value }))
          }
          style={styles.submit_text}
          status={status.email}
          textStyle={styles.input_text}
        />
        <Input
          placeholder="Password"
          value={data.password}
          onChangeText={(value) =>
            setData((prevState) => ({ ...prevState, password: value }))
          }
          style={styles.submit_text}
          status={status.password}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          textStyle={styles.input_text}
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
      </Card>
      <Text style={styles.mainText}>
        Don't have an account?{" "}
        <Text
          style={styles.boldText}
          onPress={() => props.navigation.navigate("SignUp")}
        >
          Sign Up
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
    top: "81%",
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
    height: hp("40%"),
    backgroundColor: "#f7fbfb",
    borderRadius: 29,
    shadowColor: "#dbebeb",
    shadowOffset: { width: 24, height: 24 },
    shadowRadius: 42,
    elevation: 20,
    justifyContent: "center",
  },
  input_text: {
    color: "#172A3A",
  },
});

export default SignIn;
