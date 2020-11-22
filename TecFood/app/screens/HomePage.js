import {
  Card,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  TopNavigation,
  Text,
  Avatar,
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
} from "@ui-kitten/components";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Carousel from "react-native-snap-carousel";
import SyncStorage from "sync-storage";

const shoppingCartIcon = (props) => <Icon {...props} name="bell-outline" />;

const homeIcon = (props) => <Icon {...props} name="home-outline" />;

const userIcon = (props) => <Icon {...props} name="person-outline" />;

const searchIcon = (props) => <Icon {...props} name="search-outline" />;

const menuIcon = (props) => <Icon {...props} name="more-vertical" />;

const logoutIcon = (props) => <Icon {...props} name="log-out" />;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = Math.round(sliderWidth * 0.7);

function HomePage(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const componentIsMounted = useRef(true);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const user = SyncStorage.get("USER");

  const getFirstNameUser = () => {
    const splitString = user.Name.split(" ");
    return splitString[0];
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const logout = () => {
    SyncStorage.remove("USER_TOKEN");
    props.navigation.navigate("SignUp");
  };

  const renderMenuAction = () => (
    <TopNavigationAction
      icon={menuIcon}
      style={{ top: "2.5%" }}
      onPress={toggleMenu}
    />
  );

  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
      >
        <MenuItem
          accessoryLeft={logoutIcon}
          title="Logout"
          onPress={() => logout()}
        />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderAppTitle = (props) => (
    <View>
      <Avatar
        style={styles.logo}
        size="large"
        shape="square"
        source={require("../assets/icon.png")}
      />
      <Text
        {...props}
        style={{
          fontFamily: "OpenSans_Bold",
          fontSize: 18,
          alignSelf: "center",
          flexDirection: "row",
          top: "-40%",
          left: "155%",
          color: "#182a3a",
        }}
      >
        TecFoods
      </Text>
    </View>
  );

  // fetch only the available restaurants
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

  const renderRestaurant = ({ item }) => (
    <Card
      style={styles.itemContainer}
      onPress={() =>
        props.navigation.navigate("MenuPage", {
          restaurantId: item._id,
          restaurantName: item.name,
        })
      }
    >
      <ImageBackground
        resizeMode="cover"
        style={styles.restaurantImage}
        source={require("../assets/RestaurantFoodHeader.jpg")}
      />
      <Text style={styles.carrouselItemTitle}>{item.name}</Text>
      <Text style={styles.carrouselItemText}>{item.location}</Text>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9fefe" }}>
      <TopNavigation
        title={renderAppTitle}
        accessoryRight={renderOverflowMenuAction}
        style={{ backgroundColor: "rgba(52, 52, 52, 0)" }}
      />
      <Text
        style={{
          fontFamily: "OpenSans_Regular",
          color: "#182a3a",
          fontSize: 24,
          marginLeft: "5%",
          marginTop: "8%",
        }}
      >
        Hi, {getFirstNameUser()}
      </Text>
      <Text style={styles.mainText}>Let's eat</Text>
      <Image
        style={{ width: "20%", height: "10.5%", left: "57%", top: "-11%" }}
        source={require("../assets/soup_emoji.png")}
      ></Image>
      <Text style={styles.restaurantText}>Restaurants</Text>
      <View style={{ top: "-3%" }}>
        <Carousel
          data={restaurants}
          renderItem={renderRestaurant}
          onSnapToItem={(index) => setActiveSlide(index)}
          sliderWidth={500}
          itemWidth={itemWidth}
          itemHeight={700}
        />
      </View>
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
        <BottomNavigationTab icon={userIcon} title="User" />
        <BottomNavigationTab icon={homeIcon} title="Home" />
        <BottomNavigationTab icon={searchIcon} title="Search" />
        <BottomNavigationTab icon={shoppingCartIcon} title="Orders" />
      </BottomNavigation>
    </SafeAreaView>
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
  logo: {
    flexDirection: "row",
    marginTop: "45%",
    alignSelf: "center",
    left: "80%",
  },
  mainText: {
    fontFamily: "OpenSans_Bold",
    color: "#182a3a",
    fontSize: 42,
    marginLeft: "5%",
  },
  restaurantText: {
    fontFamily: "OpenSans_Bold",
    color: "#182a3a",
    fontSize: 24,
    marginLeft: "5%",
    top: "-5%",
  },
  itemContainer: {
    width: "85%",
    height: "65%",
    alignItems: "center",
    borderRadius: 29,
    elevation: 20,
    backgroundColor: "#f7fbfb",
    marginTop: "3%",
    borderWidth: 0,
    left: "-15%",
    paddingBottom: "25%",
  },
  restaurantImage: {
    width: "120%",
    height: "90%",
    top: "-6.5%",
    alignSelf: "center",
    left: "-75%",
  },
  carrouselItemTitle: {
    fontFamily: "OpenSans_Bold",
    left: "-5%",
    top: "-10%",
    width: 300,
    fontSize: 16,
    paddingLeft: "35%",
  },
  carrouselItemText: {
    fontFamily: "OpenSans_Regular",
    left: "-5%",
    top: "-10%",
    width: 250,
    fontSize: 14,
    paddingLeft: "35%",
    marginTop: "5%",
  },
});

export default HomePage;
