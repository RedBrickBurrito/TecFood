import React, { useState } from "react";
import { useDeviceOrientation } from "@react-native-community/hooks";
import axios from "axios";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { default as theme } from "./custom-theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import "react-native-gesture-handler";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignUp from "./app/screens/SignUp";
import ProductPage from "./app/screens/ProductPage";
import MenuPage from "./app/screens/MenuPage";
import SignIn from "./app/screens/SignIn";

let customFonts = {
  Coolvetica: require("./app/assets/fonts/coolvetica_rg.ttf"),
  OpenSans_Regular: require("./app/assets/fonts/OpenSans-Regular.ttf"),
  OpenSans_Bold: require("./app/assets/fonts/OpenSans-Bold.ttf"),
};

const Stack = createStackNavigator();

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
        <NavigationContainer>
          {
            <>
              <IconRegistry icons={EvaIconsPack} />
              <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                <Stack.Navigator headerMode="none">
                  <Stack.Screen name="SignUp" component={SignUp} />
                  <Stack.Screen name="SignIn" component={SignIn} />
                  <Stack.Screen name="MenuPage" component={MenuPage} />
                  <Stack.Screen name="ProductPage" component={ProductPage} />
                </Stack.Navigator>
              </ApplicationProvider>
            </>
          }
        </NavigationContainer>
      );
    } else {
      return <AppLoading />;
    }
  }
}
