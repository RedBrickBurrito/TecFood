import React, { useState } from "react";
import { useDeviceOrientation } from "@react-native-community/hooks";
import axios from "axios";
import SignUp from "./app/screens/SignUp";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva';
import { default as theme } from './custom-theme.json'; // <-- Import app theme

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
      return (
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <SignUp />
        </ApplicationProvider>
      );
    } else {
      return <AppLoading />;
    }
  }
}
