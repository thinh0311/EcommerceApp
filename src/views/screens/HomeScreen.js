import React, { useEffect } from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from "react-native";
// import {
//   FlatList,
//   ScrollView,
//   TouchableHighlight,
// } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";
import accountApi from "../../api/accountApi";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import COLORS from "../../consts/colors";
import { ScrollView } from "react-native-gesture-handler";
const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;
const { height } = Dimensions.get("screen").height;
const cardHeight = height / 4;

const HomeScreen = ({ navigation }) => {
  const [token, setToken] = React.useState("");
  const [sellProducts, setSellProducts] = React.useState([]);
  const [promoteProducts, setPromoteProducts] = React.useState([]);
  const [temp, setTemp] = React.useState([]);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const getToken = async () => {
      try {
        const result = await JSON.parse(await AsyncStorage.getItem("token"));
        setToken(result);
      } catch (error) {}
    };

    getToken();
  }, []);

  React.useEffect(() => {
    const getUser = async () => {
      try {
        const result = await accountApi.getAccount(token);
        setUser(result);
      } catch (error) {}
    };
    getUser();
  }, [token]);

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await productApi.getProductsPromote();
        setPromoteProducts(result);
        const _result = await productApi.getProductsSelling();
        setSellProducts(_result);
      } catch (error) {
        // console.log(error);
      }
    };

    getProducts();
  }, []);

  const Card = ({ product, discount }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("DetailsScreen", [product.maSanPham, token])
        }
      >
        <View style={styles.card}>
          <View style={{ position: "absolute", right: -30, top: -10 }}>
            <View
              style={{
                backgroundColor: COLORS.primary,
                width: 30,
                height: 30,
                borderRadius: 25,
                position: "absolute",
                zIndex: 1,
                top: 15,
                right: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {discount != 0 ? discount : 0}%
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Image
              source={
                product.hinhAnh === "string"
                  ? require("../../assets/product.png")
                  : { uri: product.hinhAnh }
              }
              style={{
                height: 120,
                width: 120,
                borderRadius: 10,
                resizeMode: "cover",
              }}
            />
          </View>
          <View style={{ marginTop: 15, height: 40 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {product.tenSanPham.length > 25
                ? `${product.tenSanPham.substring(0, 25)}...`
                : product.tenSanPham}
            </Text>
          </View>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 14,
                  textDecorationLine: discount != 0 ? "line-through" : "none",
                  fontWeight: discount != 0 ? "normal" : "bold",
                }}
              >
                {product.donGia}đ
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {discount != 0
                  ? `${product.donGia - (product.donGia * discount) / 100}đ`
                  : ""}
              </Text>
            </View>
            <View style={styles.addToCartBtn}>
              <Icon name="add" size={20} color={COLORS.white} />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 18 }}>Xin chào,</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
              {user.hoTen}
            </Text>
          </View>
          <Text style={{ marginTop: 5, fontSize: 16, color: COLORS.grey }}>
            Bạn muốn mua gì hôm nay?
          </Text>
        </View>
        <Image
          source={require("../../assets/product.png")}
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
      </View>
      {/* <ScrollView> */}
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: "#f15b5d",
          }}
        >
          Sản phẩm bán chạy
        </Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={sellProducts}
        keyExtractor={(item) => item.maSanPham}
        renderItem={({ item }) => (
          <Card product={item} discount={item.giamGia} />
        )}
      ></FlatList>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: "#f15b5d",
            marginTop: -20,
            marginBottom: 20,
          }}
        >
          Sản phẩm khuyến mãi khủng
        </Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={promoteProducts}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <Card product={item.sanPham} discount={item.phanTramGiam} />
        )}
      ></FlatList>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 50,
  },
  sortBtn: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  categoryBtnImg: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 240,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  imageCardCategory: {
    height: 35,
    width: 35,
    resizeMode: "cover",
    borderRadius: 35,
  },
});

export default HomeScreen;
