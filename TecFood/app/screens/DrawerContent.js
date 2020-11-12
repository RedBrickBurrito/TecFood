import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

function DrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={styles.drawerHeader}>Hi</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  drawerHeader: {
    fontSize: 20,
    fontFamily: "Coolvetica",
    color: "#182A3A",
  },
});

export default DrawerContent;
