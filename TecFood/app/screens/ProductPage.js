import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  ImageBackground,
  BackHandler,
} from "react-native";
import {
  Card,
  CheckBox,
  Divider,
  Input,
  Modal,
  Button,
} from "@ui-kitten/components";

const { height, width } = Dimensions.get("window");

function ProductPage(props) {
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
      <View style={styles.content}>
        <Image
          source={product.image !== "" ? { uri: product.image } : null}
          style={styles.productImage}
          resizeMode="cover"
        />
        <ScrollView>
          <View style={styles.attributes}>
            <Text style={styles.title}>{product.name}</Text>
            <View>
              {product.includedSides.map(side => {
                return (
                  <CheckBox
                    key={side}
                    checked={checkboxes.side}
                    onChange={(next) =>
                      setCheckboxes({ ...checkboxes, side: next })
                    }
                    style={{ marginBottom: "3%" }}
                  >
                    {side}
                  </CheckBox>
                )
              })}
            </View>
            <Divider style={styles.divider} />
            <Text style={styles.title}>Special Instructions</Text>
            <Input
              placeholder="Extra napkins, sauce..."
              value={special}
              style={styles.input}
              textStyle={styles.inputText}
              onChangeText={value => setSpecial(value)}
            />
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "20%",
            }}
          >
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
            <Button style={styles.addToCart} size="small">
              <Text style={styles.addToCartText}>Add to Cart (${(product.price / 100) * quantity})</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    top: "10%",
    borderRadius: 29,
    backgroundColor: "#F7FBFB",
    height: "80%",
    paddingBottom: "70%",
  },
  content: {
    width: width * 0.7,
    justifyContent: "space-between",
    bottom: "5%",
  },
  productImage: {
    alignSelf: "center",
    width: width * 0.85,
    height: "35%",
    borderRadius: 29,
    marginBottom: "15%",
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
    width: "16%",
    marginBottom: "2%",
    borderWidth: 0,
    elevation: 8,
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
    marginTop: "25%",
    alignSelf: "center",
    borderRadius: 29,
    width: "70%",
    bottom: "15%",
  },
  addToCartText: {
    fontSize: 18,
  },
});

export default ProductPage;
