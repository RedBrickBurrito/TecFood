import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  ImageBackground,
} from "react-native";
import { Icon, Card, Text, Button, Layout, Modal } from "@ui-kitten/components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HeaderImageScrollView, {
  TriggeringView,
} from "react-native-image-header-scroll-view";
import Animated from "react-native-reanimated";
import ProductPage from "./ProductPage";
import axios from "axios";
import CartComponent from "./CartComponent";

const backIcon = (props) => <Icon {...props} name="arrow-circle-left" />;

export const MenuPage = ({ route, navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState({});
  const mounted = useRef();

  const MAX_HEIGHT = 250;

  const { restaurantId, restaurantName } = route.params;
  const [items, getItems] = useState([]);

  const handleProductClick = (item) => {
    setSelectedProduct(item);
  };

  // If the component is mounted, set the modal visible
  useEffect(() => {
    if (mounted.current) setVisible(true);
  }, [selectedProduct]);

  // Fetch only the available items and set mounted to true
  useEffect(() => {
    axios
      .get(
        "https://tecfood.herokuapp.com/api/restaurant/" + restaurantId + "/item"
      )
      .then((response) => {
        const filteredItems = response.data.filter((item) => {
          return item.availability;
        });
        getItems(filteredItems);
      });
    mounted.current = true;
  }, []);

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
                onPress={() => navigation.navigate("HomePage")}
              />
              <Text style={styles.restaurantTitle}>
                Restaurant {restaurantName}
              </Text>
            </Layout>
          </Animated.View>
        )}
      >
        <TriggeringView
          style={{
            height: "100%",
            paddingBottom: "20%",
            backgroundColor: "#f9fefe",
            borderTopLeftRadius: 29,
            borderTopRightRadius: 29,
            elevation: 20,
          }}
        >
          {items.map((item) => {
            return (
              <Card
                style={styles.card}
                key={item._id}
                onPress={() => handleProductClick(item)}
              >
                <ImageBackground
                  style={styles.product_photo}
                  source={
                    item.image !== ""
                      ? { uri: item.image }
                      : require("../assets/R_Option1.jpg")
                  }
                >
                  <Text style={styles.product_Title}>{item.name}</Text>
                  <Text style={styles.product_Text}>{item.description}</Text>
                  <Text style={styles.product_price}>$ {item.price / 100}</Text>
                </ImageBackground>
              </Card>
            );
          })}
        </TriggeringView>
      </HeaderImageScrollView>
      <CartComponent />
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <ProductPage product={selectedProduct} hide={() => setVisible(false)} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    top: "1%",
    backgroundColor: "#f7fbfb",
    borderRadius: 29,
    shadowColor: "#dbebeb",
    shadowOffset: { width: 24, height: 24 },
    shadowRadius: 42,
    elevation: 20,
    marginBottom: "15%",
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
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
  },
});

export default MenuPage;
