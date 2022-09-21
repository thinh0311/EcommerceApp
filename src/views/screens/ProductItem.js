import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const ProductItem = ({ name, price, discount, image, describe, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 120,
        paddingTop: 20,
        paddingStart: 10,
        flexDirection: "row",
      }}
    >
      <Image
        style={{
          width: 100,
          height: 100,
          resizeMode: "cover",
          borderRadius: 10,
          marginRight: 15,
        }}
        source={
          image == "string"
            ? require("../../assets/product.png")
            : {
                uri: image,
              }
        }
      />
      <View
        style={{
          flex: 1,
          marginRight: 10,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: "black",
          }}
        />
        <Text
          style={{
            color: "black",
            fontSize: 14,
          }}
        >
          Mô tả: {describe.substring(0, 29)}...
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: 14,
          }}
        >
          Giá:{" "}
          <Text
            style={{
              textDecorationLine: discount != 0 ? "line-through" : "none",
            }}
          >
            {price}đ
          </Text>
          {discount != 0 ? ` - ${price - (price * discount) / 100}đ` : ""}
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: 14,
          }}
        >
          Giảm giá: {discount != 0 ? discount : 0}%
        </Text>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Icon style={{ paddingEnd: 5 }} name="facebook" size={18} />

          <Icon name="twitter" style={{ paddingEnd: 5 }} size={18} />

          <Icon name="instagram" size={18} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ProductItem;
