import {
  Card,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import axios from "axios";

const shoppingCartIcon = (props) => <Icon {...props} name="bell-outline" />;

const homeIcon = (props) => <Icon {...props} name="home-outline" />;

const userIcon = (props) => <Icon {...props} name="person-outline" />;

const searchIcon = (props) => <Icon {...props} name="search-outline" />;

function MainScreen({navigation}) {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    axios
      .get("https://tecfood.herokuapp.com/api/restaurant")
      .then((response) => {
        const filteredRestaurants = response.data.filter((restaurant) => {
          return restaurant.availability;
        });
        setRestaurants(filteredRestaurants);
        componentIsMounted.current = false;
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text>You are in the Main Screen</Text>
        {restaurants.map((restaurant) => {
          return (
            <Card
              key={restaurant._id}
              onPress={() =>
                navigation.navigate("MenuPage", {
                  restaurantId: restaurant._id,
                  restaurantName: restaurant.name,
                })
              }
            >
              <Text>Name: {restaurant.name}</Text>
              <Text>ID: {restaurant._id}</Text>
              <Text>Manager: {restaurant.restManagerName}</Text>
              <Text>Manager Phone: {restaurant.restManagerPhone}</Text>
            </Card>
          );
        })}
      </ScrollView>
      <BottomNavigation
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        style={(styles.bottomNavigation, styles.shadow)}
        indicatorStyle={{
          bottom: 0,
          borderTopLeftRadius: 29,
          borderTopRightRadius: 29,
        }}
      >
        <BottomNavigationTab icon={userIcon} title="User" onPress={() => navigation.openDrawer()}/>
        <BottomNavigationTab icon={homeIcon} title="Home" />
        <BottomNavigationTab icon={searchIcon} title="Search" />
        <BottomNavigationTab icon={shoppingCartIcon} title="Orders" />
      </BottomNavigation>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavigation: {
    marginTop: 20,
    position: "absolute",
    bottom: 0,
    elevation: 20,
    backgroundColor: "#f7fbfb",
    borderTopLeftRadius: 29,
    borderTopRightRadius: 29,
    fontFamily: "OpenSans_Regular",
  },
  shadow: {
    elevation: 20,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 29,
    borderTopRightRadius: 29,
  },
});

export default MainScreen;
