import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Card, Button, Icon } from "@ui-kitten/components";

const { height, width } = Dimensions.get("window");
const backIcon = () => <Icon name="arrow-back" style={styles.icon} fill="black" />;
const checkmark = () => <Icon name="checkmark" style={styles.icon} fill="#FFFFFF" />

function ChangePayment({navigation}) {
  const [active, setActive] = useState({cash: false, paypal: false, card: false});

  const handleBackPress = () => {
    navigation.navigate("MainScreen")
  }

  const handlePress = (type) => {
    if(type === "cash") {
        const next = active.cash ? false : true;
        setActive({...active, cash: next});
    } else if(type === "paypal") {
        const next = active.paypal ? false : true;
        setActive({...active, paypal: next});
    } else if(type === "card") {
        const next = active.card ? false : true;
        setActive({...active, card: next});
    }
  };

  return (
    <View style={styles.background}>
      <Button style={styles.back_button} accessoryLeft={backIcon} onPress={handleBackPress}></Button>
      <Text style={styles.title}>Change Payment</Text>
      <View style={styles.form_content}>
        <Button style={active.cash ? styles.active_button : styles.button} onPress={() => handlePress("cash")} accessoryRight={active.cash ? checkmark : null} >
          <Text style={active.cash ? styles.active_text : styles.button_text}>Cash</Text>
        </Button>  
        <Button style={active.paypal ? styles.active_button : styles.button} onPress={() => handlePress("paypal")} accessoryRight={active.paypal ? checkmark : null} >
          <Text style={active.paypal ? styles.active_text : styles.button_text}>PayPal</Text>
        </Button>
        <Button style={active.card ? styles.active_button : styles.button} onPress={() => handlePress("card")} accessoryRight={active.card ? checkmark : null} >
          <Text style={active.card ? styles.active_text : styles.button_text}>Credit / Debit Card</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 32, 
    height: 32,
  },
  background: {
    backgroundColor: "#FFFFFF",
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
  form_content:{
    top: 15,
    paddingVertical: height * 0.07,
    paddingHorizontal: width * 0.03,
    justifyContent: "space-around",
    height: height * 0.65,
  },
  button: {
    borderRadius: 34,
    borderColor: "#FFFFFF",
    height: height * 0.13,
    elevation: 20,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: width * 0.05,
  },
  active_button: {
    borderRadius: 34,
    height: height * 0.13,
    elevation: 20,
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
  },
  button_text: {
    fontSize: 18,
    color: "#000000",
  },
  active_text: {
    fontSize: 18,
    color: "#FFFFFF"
  }
});

export default ChangePayment;