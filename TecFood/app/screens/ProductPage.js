import React, { useState, useEffect } from "react";
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
import { handleProductRequest } from "../../services/ProductService";

const { height, width } = Dimensions.get("window");

function ProductPage(props) {
  const [special, setSpecial] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [checkboxes, setCheckboxes] = useState({ agave: false, maple: false });
  const [productData, setProductData] = useState({});

  const { product_id, visible, hide } = props;

  useEffect(() => {
    setProductData(handleProductRequest(product_id));
  }, []);

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
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={hide}
    >
      <Card style={styles.card} appearance="filled">
        <View style={styles.content}>
          <Image
            source={require("../assets/R_Option1.jpg")}
            style={styles.productImage}
            resizeMode="cover"
          />
          <ScrollView>
            <View style={styles.attributes}>
              <Text style={styles.title}>Select Honey</Text>
              <View>
                <CheckBox
                  checked={checkboxes.agave}
                  onChange={(next) =>
                    setCheckboxes({ ...checkboxes, agave: next })
                  }
                  style={{ marginBottom: "3%" }}
                >
                  Agave Syrup
                </CheckBox>
                <CheckBox
                  checked={checkboxes.maple}
                  onChange={(next) =>
                    setCheckboxes({ ...checkboxes, maple: next })
                  }
                  style={{ marginBottom: "3%" }}
                  style={{ marginBottom: "3%" }}
                >
                  Maple Syrup
                </CheckBox>
              </View>
              <Divider style={styles.divider} />
              <Text style={styles.title}>Special Instructions</Text>
              <Input
                placeholder="Extra napkins, sauce..."
                value={special}
                onChangeText={(value) => setSpecial(value)}
                style={styles.input}
                textStyle={styles.inputText}
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
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </Card>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
  },
  card: {
    borderRadius: 29,
    backgroundColor: "#F7FBFB",
    height: "80%",
    paddingBottom: "60%",
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
    borderColor: "black",
    backgroundColor: "white",
    borderRadius: 30,
    height: "100%",
    width: "16%",
    marginBottom: "2%",
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
    marginTop: "18%",
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
