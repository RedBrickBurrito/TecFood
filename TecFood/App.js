import React, { useState } from "react";
import { useDeviceOrientation } from "@react-native-community/hooks";
import axios from "axios";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { default as theme } from "./custom-theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignUp from "./app/screens/SignUp";
import SignIn from "./app/screens/SignIn";
import MainScreen from "./app/screens/MainScreen";
import ProductPage from "./app/screens/ProductPage";
import MenuPage from "./app/screens/MenuPage";

const Stack = createStackNavigator();

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
        <NavigationContainer>
          {
            <>
              <IconRegistry icons={EvaIconsPack} />
              <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                <Stack.Navigator headerMode="none">
                  <Stack.Screen name="SignUp" component={SignUp} />
                  <Stack.Screen name="SignIn" component={SignIn} />
                  <Stack.Screen name="Main" component={MainScreen} />
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
