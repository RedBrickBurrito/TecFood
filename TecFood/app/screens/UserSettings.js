import React from "react";
import { StyleSheet, Dimensions, Text, View, Alert } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerItem } from "@ui-kitten/components";
import { Icon } from "@ui-kitten/components";
import SyncStorage from "sync-storage";

const { height, width } = Dimensions.get("screen");
const emailIcon = () => (
  <Icon name="email-outline" fill="#000" style={{ height: 25, width: 25 }} />
);
const settingsIcon = () => (
  <Icon
    name="settings-2-outline"
    fill="#000"
    style={{ height: 25, width: 25 }}
  />
);
const cardIcon = () => (
  <Icon
    name="credit-card-outline"
    fill="#000"
    style={{ height: 25, width: 25 }}
  />
);

const rightArrowIcon = (props) => (
  <Icon {...props} name="arrow-ios-forward-outline" />
);

function UserSettings(props) {
  const user = SyncStorage.get("USER");

  const handleAlert = () => {
    Alert.alert("Logout", "Do you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log out",
        onPress: () => logout(),
      },
    ]);
  };

  const logout = () => {
    SyncStorage.remove("USER_TOKEN");
    props.navigation.navigate("SignUp");
  };

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: "#F7FBFB" }}>
      <View style={styles.drawer_header}>
        <View>
          <Text style={styles.hi}>Hi</Text>
          <Text style={styles.name}>{user.Name}</Text>
        </View>
        <Icon name="person" style={styles.icon} fill="#000" />
      </View>
      <View style={styles.item_list}>
        <Text style={styles.title}>My Account</Text>
        <View style={{ backgroundColor: "#FFFFFF" }}>
          <DrawerItem
            title="Change Email"
            accessoryLeft={emailIcon}
            onPress={() => props.navigation.navigate("Change Email")}
            accessoryRight={rightArrowIcon}
            style={{ paddingLeft: width * 0.05 }}
          />
          <View style={styles.divider} />
          <DrawerItem
            title="Change Name"
            accessoryLeft={settingsIcon}
            onPress={() => props.navigation.navigate("Change Name")}
            accessoryRight={rightArrowIcon}
            style={{ paddingLeft: width * 0.05 }}
          />
          <View style={styles.divider} />
          <DrawerItem
            title="Change Payment"
            accessoryLeft={cardIcon}
            onPress={() => props.navigation.navigate("Change Payment")}
            accessoryRight={rightArrowIcon}
            style={{ paddingLeft: width * 0.05 }}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Icon name="log-out" style={{ height: 32, width: 32 }} fill="#000" />
        <Text style={styles.logout} onPress={() => handleAlert()}>
          Logout
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawer_header: {
    paddingVertical: height * 0.05,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    height: 1,
    width: width * 0.65,
    backgroundColor: "#EAEAEA",
  },
  icon: {
    height: 60,
    width: 60,
  },
  hi: {
    fontSize: 20,
    fontWeight: "normal",
    fontFamily: "OpenSans_Regular",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "OpenSans_Regular",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "OpenSans_Regular",
    left: width * 0.05,
    marginVertical: 10,
  },
  item_list: {
    height: height * 0.5,
  },
  item_label: {
    fontFamily: "OpenSans_Regular",
    fontSize: 18,
    color: "#062D69",
  },
  footer: {
    paddingLeft: width * 0.05,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  logout: {
    paddingLeft: 5,
    color: "#000000",
    fontSize: 14,
  },
});

export default UserSettings;
