import React from "react";
import {
  Dimensions,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableHighlight,
} from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";
import accountApi from "../../api/accountApi";
import COLORS from "../../consts/colors";
import Button from "../components/Button";
import ProductItem from "./ProductItem";
const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const ProductSreen = ({ navigation }) => {
  const [token, setToken] = React.useState("");
  const [idProduct, setIdProduct] = React.useState("");
  const [searchText, setSearchText] = React.useState("");
  const [category, setCategory] = React.useState([]);
  const [idCategory, setIdCategory] = React.useState();
  const [filteredItemByCategory, setFilteredItemByCategory] = React.useState(
    []
  );
  const [filteredItemByName, setFilteredItemByName] = React.useState([]);

  React.useEffect(() => {
    const getProductsByName = async () => {
      try {
        const result = await productApi.searchProduct(normal(searchText));
        setFilteredItemByName(result);
        console.log(result);
      } catch (error) {
        // console.log(error);
      }
    };
    getProductsByName();
  }, [searchText]);

  React.useEffect(() => {
    const getToken = async () => {
      try {
        const result = await JSON.parse(await AsyncStorage.getItem("token"));
        setToken(result);
      } catch (error) {}
    };

    const getCategory = async () => {
      try {
        const result = await categoryApi.getAll();
        setCategory(result);
        setIdCategory(result[0].maLoaiNuoc);
      } catch (error) {
        // console.log(error);
      }
    };

    getCategory();
    getToken();
  }, []);

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await productApi.getProductsByCategory(idCategory);
        setFilteredItemByCategory(result);
        //console.log(result);
      } catch (error) {
        // console.log(error);
      }
    };
    getProducts();
  }, [idCategory]);

  const ListCategory = () => {
    return (
      <FlatList
        horizontal
        data={category}
        keyExtractor={(item, index) => `${item.maLoaiNuoc}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setIdCategory(item.maLoaiNuoc);
            }}
          >
            <View
              style={{
                backgroundColor:
                  idCategory == item.maLoaiNuoc
                    ? COLORS.primary
                    : COLORS.secondary,
                ...styles.categoryBtn,
              }}
            >
              <Image
                source={
                  item.hinhAnh === "string"
                    ? require("../../assets/product.png")
                    : { uri: item.hinhAnh }
                }
                style={styles.imageCardCategory}
              />
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontWeight: "bold",
                  color:
                    idCategory == item.maLoaiNuoc
                      ? COLORS.white
                      : COLORS.primary,
                }}
              >
                {item.tenLoaiNuoc}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    );
  };

  const Card = ({ product, discount }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("DetailsScreen", [product.maSanPham, token])
        }
      >
        <ProductItem
          onPress={() => {}}
          name={product.tenSanPham}
          image={product.hinhAnh}
          price={product.donGia}
          discount={discount}
          describe={product.moTa}
          key={product.maSanPham}
        />
      </TouchableHighlight>
    );
  };

  const normal = (string) => {
    const arr = string.split(" ");
    var kq = "",
      temp;
    for (let i = 0; i < arr.length; i++) {
      temp = arr[i].trim().toLowerCase();
      if (temp != "") {
        kq += temp + " ";
      }
    }
    return kq.trim();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 18 }}>Danh sách sản phẩm</Text>
        </View>
      </View>
      <View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            name="search"
            size={15}
            color={"black"}
            style={{
              position: "absolute",
              top: 12,
              left: 10,
            }}
          />
          <TextInput
            autoCorrect={false}
            onChangeText={(text) => {
              setSearchText(text);
            }}
            style={{
              backgroundColor: "rgb(169,169,169)",
              height: 40,
              flex: 1,
              marginEnd: 8,
              borderRadius: 5,
              opacity: 0.8,
              paddingStart: 30,
            }}
          />
          <Icon2 name="bars" size={30} color={"black"} />
        </View>
      </View>

      {searchText.length == 0 ? (
        <View>
          <View
            style={{
              height: 90,
            }}
          >
            <View
              style={{
                height: 1,
                backgroundColor: "grey",
              }}
            />
            <ListCategory />
            <View style={{ height: 1, backgroundColor: "grey" }} />
          </View>
          <FlatList
            style={{ height: 500 }}
            data={filteredItemByCategory}
            renderItem={({ item }) => (
              <Card product={item.sanPham} discount={item.giamGia} />
            )}
            keyExtractor={(eachProduct) => eachProduct.sanPham.maSanPham}
          />
        </View>
      ) : (
        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: "red" }}>Kết quả tìm kiếm</Text>
          </View>
          <FlatList
            style={{ height: 620 }}
            data={filteredItemByName}
            renderItem={({ item }) => (
              <Card product={item.sanPham} discount={item.giamGia} />
            )}
            keyExtractor={(eachProduct) => eachProduct.sanPham.maSanPham}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
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
    height: 37,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 1,
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
    height: 210,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  btnAddProduct: {
    height: 40,
    width: 40,
    borderRadius: 30,
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

export default ProductSreen;
