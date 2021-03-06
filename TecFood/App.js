import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { default as theme } from "./custom-theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions } from "react-native";
import SyncStorage from "sync-storage";

import SignUp from "./app/screens/SignUp";
import SignIn from "./app/screens/SignIn";
import HomePage from "./app/screens/HomePage";
import ProductPage from "./app/screens/ProductPage";
import MenuPage from "./app/screens/MenuPage";
import CartComponent from "./app/screens/CartComponent";
import ChangeEmail from "./app/screens/ChangeEmail";
import ChangeName from "./app/screens/ChangeName";
import ChangePayment from "./app/screens/ChangePayment";
import UserSettings from "./app/screens/UserSettings";

const { height, width } = Dimensions.get("screen");
const Start = createStackNavigator();
const Main = createStackNavigator();
const Drawer = createDrawerNavigator();

const mainNavigator = () => {
  return(
    <Main.Navigator headerMode="none">
      <Main.Screen name="HomePage" component={HomePage} />
      <Main.Screen name="MenuPage" component={MenuPage} />
      <Main.Screen name="ProductPage" component={ProductPage} />
      <Main.Screen name="CartComponent" component={CartComponent} />
    </Main.Navigator>
  );
};

const drawerNavigator = () => {
  const drawerContentStyle = {
    justifyContent: "space-between",
    height: height * 0.85,
  }

  return(
    <Drawer.Navigator 
      screenOptions={{headerShown: false}} 
      drawerContent={UserSettings} 
      backBehavior="initialRoute" 
      drawerContentOptions={{ contentContainerStyle: drawerContentStyle }}
    >
      <Drawer.Screen name="Home Page" component={mainNavigator} />
      <Drawer.Screen name="Change Email" component={ChangeEmail} />
      <Drawer.Screen name="Change Name" component={ChangeName} />
      <Drawer.Screen name="Change Payment" component={ChangePayment} />
    </Drawer.Navigator>
  );
};

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

  async _loadSyncStorage() {
    const data = await SyncStorage.init();
    console.log("AsyncStorage is ready!", data);
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <NavigationContainer>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <Start.Navigator headerMode="none">
            <Start.Screen name="SignUp" component={SignUp} />
            <Start.Screen name="SignIn" component={SignIn} />
            <Start.Screen name="Drawer" component={drawerNavigator} />
          </Start.Navigator>
          </ApplicationProvider>
        </NavigationContainer>
      );
    } else {
      return <AppLoading />;
    }
  }
}
