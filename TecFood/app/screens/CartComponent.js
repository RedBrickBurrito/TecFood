import * as React from "react";
import { StyleSheet, View, Alert } from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { Text, Button, Layout, Icon } from "@ui-kitten/components";

const closeIcon = (props) => <Icon {...props} name="close-circle-outline" />;

export function showCartAlert(productName) {
  Alert.alert(
    "",
    "Added " + productName + " to the cart.",
    [{ text: "Close" }],
    { cancelable: false }
  );
  countProductItemsinCart();
}

function CartComponent(props) {
  const quantity = 1;
  const price = 150;
  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const countProductItemsinCart = () => {
    if (quantity == 1) {
      return quantity;
    } else {
      quantity += 1;
      return quantity;
    }
  };

  const renderInner = () => (
    <View style={styles.bottom_sheet_content}>
      <View style={styles.cart_content}>
        <Layout>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "OpenSans_Bold",
              backgroundColor: "#F7FBFB",
            }}
          >
            Cart
          </Text>
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
    backgroundColor: "#F7FBFB",
    height: "100%",
  },
  cart_content: {
    marginTop: 10,
    marginLeft: 20,
  },
  header: {
    backgroundColor: "#F7FBFB",
    borderTopLeftRadius: 29,
    borderTopRightRadius: 29,
  },
  panel_header: {
    alignItems: "center",
    backgroundColor: "#F7FBFB",
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
});
export default CartComponent;
