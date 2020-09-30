import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Platform,
  Dimensions,
  StatusBar,
  ImageBackground,
} from "react-native";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Card,
  List,
  Text,
  TopNavigation,
  Button,
  Layout,
} from "@ui-kitten/components";
import { LinearGradient } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeaderImageScrollView, {
  TriggeringView,
} from "react-native-image-header-scroll-view";
import Animated, { color } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

const shoppingCartIcon = (props) => (
  <Icon {...props} name="shopping-cart-outline" />
);

const homeIcon = (props) => <Icon {...props} name="home-outline" />;

const userIcon = (props) => <Icon {...props} name="person-outline" />;

const backIcon = (props) => <Icon {...props} name="arrow-circle-left" />;

export const MenuPage = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 75;
  const MAX_HEIGHT = 250;

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        barStyle="light-content"
        barStyle="light-content"
        translucent={true}
        hidden={true}
      />
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={75}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        fadeOutForeground
        headerContainerStyle={{
          height: "100%",
        }}
        scrollViewBackgroundColor="rgba(52, 52, 52, 0)"
        headerImage={require("../assets/RestaurantFoodHeader.jpg")}
        renderHeader={() => (
          <Image
            source={require("../assets/RestaurantFoodHeader.jpg")}
            style={{ resizeMode: "cover", height: "100%", overflow: "hidden" }}
          />
        )}
        renderFixedForeground={() => (
          <Animated.View>
            <Layout style={styles.buttonContainer}>
              <Button
                appearance="ghost"
                status="control"
                size="large"
                accessoryLeft={backIcon}
              />
              <Text style={styles.restaurantTitle}>
                Restaurant "The Hungry Hippo"
              </Text>
            </Layout>
          </Animated.View>
        )}
      >
        <TriggeringView
          style={{
            height: "100%",
            paddingBottom: "35%",
            backgroundColor: "#f9fefe",
            borderTopLeftRadius: 29,
            borderTopRightRadius: 29,
            elevation: 20,
          }}
        >
          <Card style={styles.card}>
            <ImageBackground
              style={styles.product_photo}
              source={require("../assets/R_Option1.jpg")}
            >
              <Text style={styles.product_Title}>Blueberry Pancakes</Text>
              <Text style={styles.product_Text}>
                Delicious blueberry pancakes accompanied with honey of your
                choice.
              </Text>
              <Text style={styles.product_price}>$150</Text>
            </ImageBackground>
          </Card>
          <Card style={styles.card}>
            <Image
              style={styles.product_photo}
              source={require("../assets/R_Option1.jpg")}
            />
          </Card>
          <Card style={styles.card}>
            <Image
              style={styles.product_photo}
              source={require("../assets/R_Option1.jpg")}
            />
          </Card>
          <Card style={styles.card}>
            <Image
              style={styles.product_photo}
              source={require("../assets/R_Option1.jpg")}
            />
          </Card>
        </TriggeringView>
      </HeaderImageScrollView>
      <BottomNavigation
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        style={(styles.bottomNavigation, styles.shadow)}
      >
        <BottomNavigationTab icon={userIcon} title="User" />
        <BottomNavigationTab icon={homeIcon} title="Home" />
        <BottomNavigationTab icon={shoppingCartIcon} title="Cart" />
      </BottomNavigation>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    marginTop: 20,
    position: "absolute",
    bottom: 0,
    elevation: 20,
    backgroundColor: "#f7fbfb",
    borderColor: "#9FBEB6",
  },
  restaurantTitle: {
    color: "#f9fefe",
    fontFamily: "OpenSans_Bold",
    fontSize: 18,
    fontWeight: "400",
  },
  shadow: {
    elevation: 20,
    position: "absolute",
    bottom: 0,
  },
  background: {
    flex: 1,
    backgroundColor: "#f9fefe",
  },
  card: {
    alignSelf: "center",
    width: wp("81%"),
    height: hp("22%"),
    flex: 1,
    top: "10%",
    backgroundColor: "#f7fbfb",
    borderRadius: 29,
    shadowColor: "#dbebeb",
    shadowOffset: { width: 24, height: 24 },
    shadowRadius: 42,
    elevation: 20,
    marginBottom: "8%",
    borderWidth: 0,
  },
  card_bg: {
    alignSelf: "center",
    width: wp("75%"),
    height: hp("100%"),
    flex: 1,
    backgroundColor: "#f7fbfb",
    borderRadius: 20,
    shadowColor: "#dbebeb",
    shadowOffset: { width: 24, height: 24 },
    shadowRadius: 42,
    elevation: 20,
  },
  product_photo: {
    height: hp("24%"),
    left: wp("-7%"),
    width: wp("35%"),
    bottom: hp("2.5%"),
    borderRadius: 29,
  },
  back_Icon: {
    height: 10,
    width: 10,
  },
  buttonContainer: {
    top: "5%",
    flexDirection: "row",
    backgroundColor: "rgba(52, 52, 52, 0)",
    alignItems: "center",
  },
  product_Title: {
    left: wp("38%"),
    top: hp("3%"),
    textAlign: "left",
    fontFamily: "OpenSans_Bold",
    fontSize: 13,
    fontWeight: "400",
  },
  product_Text: {
    textAlign: "left",
    fontFamily: "OpenSans_Regular",
    fontSize: 13,
    fontWeight: "300",
    left: wp("38%"),
    top: hp("4%"),
    width: wp("37%"),
  },
  product_price: {
    textAlign: "left",
    fontFamily: "OpenSans_Bold",
    fontSize: 13,
    fontWeight: "300",
    left: wp("38%"),
    top: hp("5.5%"),
    color: "#3F5CFF",
  },
});

export default MenuPage;
