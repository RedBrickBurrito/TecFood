import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Alert } from "react-native";
import { Card, Input, Button, Icon } from "@ui-kitten/components";
import { handleUpdateEmail } from "../../services/SettingsService";

const { height, width } = Dimensions.get("window");
const backIcon = () => <Icon name="arrow-back" style={styles.icon} fill="black" />;

function ChangeEmail({ navigation }) {
  const [email, setEmail] = useState();
  const [status, setStatus] = useState("basic")
  const validated = useRef(false);
  const mounted = useRef()

  const handleBackPress = () => {
    navigation.navigate("MainScreen")
  };

  const handleSubmit = () => {
    handleUpdateEmail(email).then(response => {
      console.log(response);
      if(response.status == 200) {
        Alert.alert("Success", response.message, [
          {
            text: "Understood",
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
    .catch(error => {
      console.log(error);
    });
  };

  const validate = () => {
    const emailRegExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
    validated.current = true;

    if (!emailRegExp.test(email)) {
      setStatus("danger");
      validated.current = false;
    } else {
      setStatus("success");
    }
  };

  useEffect(() => {
    if (mounted.current) validate();
  }, [email]);

  useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <View style={styles.background}>
      <Button style={styles.back_button} accessoryLeft={backIcon} onPress={handleBackPress}></Button>
      <Text style={styles.title}>Change Email</Text>
      <Card style={styles.form}>
        <View style={styles.form_content}>
          <Input
            placeholder="Email"
            style={styles.input}
            textStyle={styles.input_text}
            status={status}
            value={email}
            onChangeText={value => setEmail(value)}
          />
          <Button style={styles.button} onPress={() => handleSubmit()}>
            <Text style={styles.button_text}>Submit Changes</Text>
          </Button>  
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 32, 
    height: 32,
  },
  background: {
    backgroundColor: "white",
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
    width: width,
    height: height,
  },
  back_button: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    width: 32
  },
  title: {
    fontFamily: "Coolvetica",
    fontWeight: "bold",
    fontSize: 20
  },
  form: {
    top: 40,
    borderRadius: 30,
    borderColor: "lightgray",
    paddingVertical: height * 0.07,
    paddingHorizontal: width * 0.05,
  },
  form_content:{
    justifyContent: "space-around",
    height: height * 0.2,
  },
  input: {
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  input_text: {
    color: "#172A3A",
  },
  button: {
    borderRadius: 34,
    elevation: 20,
  },
  button_text: {
    fontSize: 20,
  }
});

export default ChangeEmail;