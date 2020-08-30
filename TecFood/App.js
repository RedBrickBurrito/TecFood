import {
  StatusBar,
  setStatusBarTranslucent,
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>POC Test IMOUTO!</Text>
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
