import {
  StatusBar,
  setStatusBarTranslucent,
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, Button } from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";
import axios from 'axios';

export default function App() {
  const getOrders = () => {
    axios.get('https://tecfood.herokuapp.com/orders').then(response => {
      console.log(response.data);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>POC Test IMOUTO!</Text>
      <Button
        onPress={getOrders}
        title="Get Orders"
        color="#f2e56f"
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
    paddingTop: Platform.OS === "android" ? "6%" : 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
