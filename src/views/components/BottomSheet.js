import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { BottomSheet, Button, ListItem } from "@rneui/themed";
import commentApi from "../../api/commentApi";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../consts/colors";
import accountApi from "../../api/accountApi";

const BottomSheetComponent = ({ isVisible, onPress, idsp }) => {
  const [token, setToken] = React.useState("");
  const [user, setUser] = React.useState();
  const [comment, setComment] = React.useState("");
  const [items, setItems] = React.useState({
    listComment: [],
    DataIsLoaded: false,
  });

  React.useEffect(() => {
    const getToken = async () => {
      try {
        const result = await JSON.parse(await AsyncStorage.getItem("token"));
        setToken(result);
        console.log(token);
      } catch (error) {}
    };
    getToken();
    const getUser = async () => {
      try {
        const result = await accountApi.getAccount(token);
        setUser(result);
        console.log(user);
      } catch (error) {}
    };
    getUser();
  }, [token]);
  const getAllComment = async (idsp) => {
    try {
      const result = await commentApi.getBySanPham(idsp);
      setItems({ listComment: result, DataIsLoaded: true });
      console.log(items);
    } catch (error) {
      //console.log(error);
    }
  };
  React.useEffect(() => {
    console.log(idsp);

    getAllComment(idsp);
  }, [idsp]);

  const CommentItem = ({ item }) => {
    return (
      <View style={styles.containerItem}>
        <Image
          style={styles.avatarSmall}
          source={
            item.khachHang[0].anhDaiDien === "string"
              ? require("../../../src/assets/user.png")
              : item.khachHang[0].anhDaiDien === ""
              ? require("../../../src/assets/user.png")
              : { uri: item.khachHang[0].anhDaiDien }
          }
        />

        <View style={styles.containerText}>
          <Text style={styles.displayName}>{item.khachHang[0].hoTen}</Text>
          <Text>{item.binhLuan.noiDung}</Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return <CommentItem item={item} />;
  };

  const addComment = async () => {
    try {
      const result = await commentApi.addComment({
        maKH: token,
        maSanPham: idsp,
        noiDung: comment,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSend = () => {
    if (comment.length == 0) {
      return;
    }

    addComment();
    setComment("");
    getAllComment(idsp);
  };

  return (
    <View>
      <BottomSheet
        containerStyle={{ height: 100, backgroundColor: "white" }}
        modalProps={{}}
        isVisible={isVisible}
      >
        <View>
          <TouchableOpacity
            onPress={onPress}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Icon2 name="arrowleft" size={30} />
            <Text style={{ color: "black", fontSize: 20 }}>
              Bình luận đánh giá về sản phẩm
            </Text>
            <Text style={{ color: COLORS.blue }}></Text>
          </TouchableOpacity>
          <View style={styles.containerInput}>
            <Image
              style={styles.avatarSmall}
              source={require("../../../src/assets/user.png")}
            />
            <TextInput
              value={comment}
              onChangeText={setComment}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => handleCommentSend()}>
              <Icon name="arrow-with-circle-up" size={34} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <FlatList
            style={{ height: 680 }}
            data={items.listComment}
            renderItem={renderItem}
            keyExtractor={(item) => item.binhLuan.maBinhLuan}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    flex: 1,
  },
  containerInput: {
    padding: 10,
    flexDirection: "row",
  },
  input: {
    backgroundColor: "lightgrey",
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  containerItem: {
    padding: 20,
    flexDirection: "row",
    flex: 1,
  },
  containerText: {
    marginHorizontal: 14,
  },
  displayName: {
    color: "#00BFFF",
    fontSize: 13,
  },
  avatarSmall: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
});
