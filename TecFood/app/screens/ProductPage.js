import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import {
  Card,
  CheckBox,
  Divider,
  Input,
  Button,
  Icon,
  Layout,
} from "@ui-kitten/components";

const { height, width } = Dimensions.get("window");
const closeIcon = (props) => <Icon {...props} name="close-circle-outline" />;

function ProductPage(props, { navigation }) {
  const [quantity, setQuantity] = useState(1);
  const [checkboxes, setCheckboxes] = useState({ agave: false, maple: false });
  const [special, setSpecial] = useState("");
  const { product } = props;

  const handlePress = (sign) => {
    if (sign === "minus") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      } else {
        setQuantity(1);
      }
    } else {
      setQuantity(quantity + 1);
    }
  };

  return (
    <Card style={styles.card} appearance="filled">
      <ImageBackground
        source={product.image !== "" ? { uri: product.image } : null}
        style={styles.productImage}
        resizeMode="cover"
      >
        <Layout style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.setVisible(false)}
            size="giant"
            status="control"
            accessoryRight={closeIcon}
            appearance="ghost"
          ></Button>
        </Layout>
      </ImageBackground>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <Text style={styles.title}>{product.name}</Text>
        {product.includedSides.map((side) => {
          return (
            <CheckBox
              key={side}
              checked={checkboxes.side}
              onChange={(next) => setCheckboxes({ ...checkboxes, side: next })}
              style={{ marginBottom: "3%" }}
            >
              {side}
            </CheckBox>
          );
        })}
        <Divider style={styles.divider} />
        <Text style={styles.title}>Special Instructions</Text>
        <Input
          placeholder="Extra napkins, sauce..."
          value={special}
          style={styles.input}
          textStyle={styles.inputText}
          onChangeText={(value) => setSpecial(value)}
        />
        <View style={styles.quantity}>
          <Button
            style={styles.qtyButton}
            onPress={() => handlePress("minus")}
            size="small"
          >
            <Text style={styles.qtyButtonText}>-</Text>
          </Button>
          <Text style={styles.qtyText}>{quantity}</Text>
          <Button
            style={styles.qtyButton}
            onPress={() => handlePress("plus")}
            size="small"
          >
            <Text style={styles.qtyButtonText}>+</Text>
          </Button>
        </View>
        <Button style={styles.addToCart} size="medium">
          <Text>Add to Cart (${(product.price / 100) * quantity})</Text>
        </Button>
      </ScrollView>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    top: "10%",
    borderRadius: 29,
    backgroundColor: "#F7FBFB",
    height: "100%",
    width: "80%",
    alignSelf: "center",
  },
  productImage: {
    alignSelf: "center",
    width: width * 0.8,
    height: height * 0.15,
    borderBottomEndRadius: 29,
  },
  attributes: {
    justifyContent: "space-evenly",
    minHeight: "50%",
  },
  title: {
    fontFamily: "OpenSans_Regular",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: "5%",
  },
  divider: {
    backgroundColor: "#C4C4C4",
    marginTop: "5%",
    marginBottom: "3%",
  },
  input: {
    marginTop: "3%",
    borderRadius: 29,
    backgroundColor: "#ECECEC",
    marginBottom: "10%",
  },
  inputText: {
    color: "#172A3A",
  },
  quantity: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  qtyButton: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    height: "100%",
    width: "17%",
    marginBottom: "2%",
    borderWidth: 0,
    elevation: 8,
    alignItems: "center",
  },
  qtyButtonText: {
    color: "black",
    fontSize: 15,
  },
  qtyText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  addToCart: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: "25%",
    alignSelf: "center",
    borderRadius: 19,
    fontFamily: "OpenSans_Regular",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    fontSize: 20,
    marginTop: "30%",
    bottom: "15%",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(52, 52, 52, 0)",
    alignSelf: "flex-end",
    top: "-5%",
    marginRight: "3%",
  },
});

export default ProductPage;
