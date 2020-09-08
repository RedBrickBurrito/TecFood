import React, { useState } from "react";
import { useDeviceOrientation } from "@react-native-community/hooks";
import axios from "axios";
import SignUp from "./app/screens/SignUp";
import { AppLoading } from "expo";
import * as Font from "expo-font";
let customFonts = {
  Coolvetica: require("./app/assets/fonts/coolvetica_rg.ttf"),
  OpenSans_Regular: require("./app/assets/fonts/OpenSans-Regular.ttf"),
  OpenSans_Bold: require("./app/assets/fonts/OpenSans-Bold.ttf"),
};

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (this.state.fontsLoaded) {
      return <SignUp />;
    } else {
      return <AppLoading />;
    }
  }
}
