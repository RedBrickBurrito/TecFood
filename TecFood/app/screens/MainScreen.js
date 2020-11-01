import {
  Button,
  Card,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import Axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import { PropsService } from "@ui-kitten/components/devsupport";

const shoppingCartIcon = (props) => <Icon {...props} name="bell-outline" />;

const homeIcon = (props) => <Icon {...props} name="home-outline" />;

const userIcon = (props) => <Icon {...props} name="person-outline" />;

const backIcon = (props) => <Icon {...props} name="arrow-circle-left" />;

function MainScreen(props) {
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
                props.navigation.navigate("MenuPage", {
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
      >
        <BottomNavigationTab icon={userIcon} title="User" />
        <BottomNavigationTab icon={homeIcon} title="Home" />
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
    borderColor: "#9FBEB6",
  },
  shadow: {
    elevation: 20,
    position: "absolute",
    bottom: 0,
  },
});

export default MainScreen;
