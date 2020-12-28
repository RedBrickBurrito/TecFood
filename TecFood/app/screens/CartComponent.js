import * as React from "react";
import { StyleSheet, View, Alert, Image } from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import {
  Text,
  Button,
  Layout,
  Icon,
  Card,
  Divider,
  List,
  ListItem,
} from "@ui-kitten/components";
import syncStorage from "sync-storage";

const closeIcon = (props) => <Icon {...props} name="close-circle-outline" />;

export function showCartAlert(productName) {
  Alert.alert(
    "",
    "Added " + productName + " to the cart.",
    [{ text: "Close" }],
    { cancelable: false }
  );
}

function CartComponent({ cartInfo, hideCartComponent }) {
  const quantity = cartInfo.quantity;
  const price = cartInfo.price;
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const cartItems = syncStorage.get("cart");
  const data = [];
  let [, setState] = React.useState();

  const renderCartItem = ({ item }) => (
    <Layout
      style={{ marginTop: "5%", bottom: "-15%", backgroundColor: "white" }}
    >
      <Image
        style={styles.cart_item_image}
        source={require("../assets/R_Option1.jpg")}
      />
      <Text style={styles.cart_item_name}>{item.name}</Text>
      <Text style={styles.cart_item_price}>{"$" + item.price}</Text>
      <Text style={styles.cart_item_quantity}>{item.quantity}</Text>
    </Layout>
  );

  const getCartItems = () => {
    let name = [];
    let price = [];
    let quantity = [];
    Object.values(cartItems).forEach((item) => {
      name = item.name;
      price = item.price;
      quantity = item.quantity;

      data.push({ name: name, price: price, quantity: quantity });
    });
    console.log(data);
  };

  const emptyCart = () => {
    syncStorage.set("cart", {});
    console.log(cartItems);
    setState({});
    hideCartComponent();
  };

  const renderInner = () => (
    <View style={styles.bottom_sheet_content}>
      <View style={styles.cart_content}>
        <Layout>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "OpenSans_Bold",
            }}
          >
            Cart
          </Text>
          {getCartItems()}
          <List
            data={data}
            ItemSeparatorComponent={Divider}
            renderItem={renderCartItem}
            style={{ backgroundColor: "white" }}
          />
          <Button
            size="giant"
            status="control"
            style={styles.empty_cart_btn}
            onPressIn={() => emptyCart()}
          >
            Empty Cart
          </Button>
          <Button
            size="giant"
            style={{
              bottom: 0,
              marginRight: "6%",
              borderRadius: 29,
              top: "20%",
              elevation: 20,
            }}
          >
            Checkout
          </Button>
        </Layout>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panel_header}>
        <View style={styles.panel_handle}></View>
      </View>
    </View>
  );

  const renderQty = () => (
    <View style={styles.qtyView}>
      <Text
        style={{
          alignSelf: "center",
          color: "white",
          fontFamily: "OpenSans_Bold",
          fontSize: 18,
          paddingTop: 5,
        }}
      >
        {quantity}
      </Text>
    </View>
  );

  const renderPrice = () => (
    <View style={{ marginLeft: "15%", paddingRight: "20%" }}>
      <Text style={styles.cart_price}>$ {price}</Text>
    </View>
  );

  return (
    <View>
      <Button
        style={styles.show_cart_button}
        size="giant"
        accessoryLeft={renderQty}
        accessoryRight={renderPrice}
        onPress={() => bs.current.snapTo(0)}
      >
        Show Cart
      </Button>
      <BottomSheet
        ref={bs}
        snapPoints={[675, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottom_sheet_content: {
    backgroundColor: "white",
    height: "100%",
  },
  cart_content: {
    marginTop: 10,
    marginLeft: 20,
  },
  header: {
    backgroundColor: "white",
    borderTopLeftRadius: 29,
    borderTopRightRadius: 29,
  },
  panel_header: {
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 29,
    borderTopRightRadius: 29,
  },
  panel_handle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#C8D9D4",
    marginBottom: 10,
    marginTop: 10,
  },
  showcart: {
    borderTopLeftRadius: 29,
    borderTopRightRadius: 29,
    backgroundColor: "#09BC8A",
  },
  show_cart_button: {
    height: 80,
    borderTopLeftRadius: 29,
    borderTopRightRadius: 29,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    bottom: 0,
  },
  qtyView: {
    backgroundColor: "#01505A",
    borderRadius: 40,
    height: 38,
    width: 40,
    marginBottom: "2%",
    borderWidth: 0,
    alignItems: "center",
    marginLeft: "20%",
    marginRight: "10%",
    marginTop: "3%",
  },
  show_cart_text: {
    fontFamily: "OpenSans_Bold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  cart_price: {
    fontFamily: "OpenSans_Bold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  cart_item_name: {
    fontFamily: "OpenSans_Bold",
    fontSize: 18,
    marginLeft: "30%",
    top: "-50%",
  },
  cart_item_price: {
    fontFamily: "OpenSans_Bold",
    fontSize: 18,
    color: "#3F5CFF",
    marginLeft: "30%",
    top: "-50%",
  },
  cart_item_quantity: {
    fontFamily: "OpenSans_Bold",
    fontSize: 18,
    marginLeft: "30%",
    top: "-50%",
  },
  cart_item_image: {
    height: 74,
    width: 74,
    borderRadius: 29,
  },
  empty_cart_btn: {
    backgroundColor: "#ECECEC",
    borderRadius: 0,
    width: 450,
    right: 55,
    height: "15%",
  },
});
export default CartComponent;
