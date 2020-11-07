import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

export function showCartAlert(productName) {
  alert("Added " + productName + " to the cart.", { cancelable: true });
}

function CartComponent(props, { navigation }) {
  const renderInner = () => <Text>Prueba</Text>;

  const renderHeader = () => (
    <View>
      <View></View>
    </View>
  );
  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "papayawhip",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          title="Open Bottom Sheet"
          onPress={() => bs.current.snapTo(0)}
        />
      </View>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        renderContent={renderInner}
        renderHeader={renderHeader}
      />
    </>
  );
}

export default CartComponent;
