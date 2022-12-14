import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import { SecondaryButton } from "../components/Button";
import FormInput from "../components/FormInput";
import orderApi from "../../api/orderApi";
import cartApi from "../../api/cartApi";
import detailOrderApi from "../../api/detailOrderApi";
import discountApi from "../../api/discountApi";
import CONSTANTS from "../../consts/const";
import accountApi from "../../api/accountApi";
import emailApi from "../../api/emailApi";

const PAYMENT = ["Thanh toán khi nhận hàng", "Thanh toán qua Stripe"];
const CURRENT_DATE = new Date();

const DeliverScreen = ({ navigation, route }) => {
  const [token] = route.params;
  const [user, setUser] = React.useState({});
  const [receiver, setReceiver] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [receiverError, setReceiverError] = React.useState("");
  const [addressError, setAddressError] = React.useState("");
  const [cart, setCart] = React.useState([]);
  const [listDiscount, setListDiscount] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedPay, setSelectedPay] = React.useState(0);
  const [discount, setDiscount] = React.useState({});
  const [total, setTotal] = React.useState(0);
  const [OTP, setOTP] = React.useState(0);
  const [OTPError, setOTPError] = React.useState("");
  const [confirmOtp, setConfirmOtp] = React.useState(0);

  React.useEffect(() => {
    const getUser = async () => {
      try {
        const result = await accountApi.getAccount(token);
        setUser(result);
        setReceiver(result.hoTen);
        setAddress(result.diaChi);
      } catch (error) {
        console.log(error, "user", token);
      }
    };
    getUser();
  }, [token]);

  React.useEffect(() => {
    const getCart = async () => {
      const result = await cartApi.getProductCart(token);
      setCart(result);
    };
    getCart();
    const getDiscount = async () => {
      const result = await discountApi.getAllDiscounts();
      setListDiscount(result);
    };
    getDiscount();
  }, []);

  React.useEffect(() => {
    const totalFee = () => {
      const total = cart
        ? cart.reduce(
            (total, crr) =>
              total +
              (crr.sanPham.donGia - (crr.sanPham.donGia * crr.giamGia) / 100) *
                crr.soLuong,
            0
          )
        : 0;
      setTotal(total + CONSTANTS.SHIPPING_FEE);
    };
    totalFee();
  }, [cart]);

  const checkInput = () => receiver !== "" && address !== "" && OTP !== 0;

  const handleSendOTP = async () => {
    const otp = await emailApi.sendOTP(user.email);
    console.log(user.email);
    console.log(otp);
    setConfirmOtp(otp);
  };

  const handleOrder = async () => {
    if (checkInput()) {
      if (parseInt(OTP) === confirmOtp) {
        try {
          const addOrder = await orderApi.addOrder({
            maKH: token,
            nguoiNhan: receiver,
            diaChi: address,
          });
          console.log(addOrder);
          addDetailOrder(addOrder.maDonHang);
          deleteCart();
          if (selectedPay === 0) {
            navigation.navigate("SuccessOrder");
          } else {
            navigation.navigate("Payment", [total, user.email]);
          }
        } catch (error) {
          console.log(error, "order");
        }
      } else {
        setOTPError("OTP không đúng!");
      }
    } else {
      if (receiver === "") {
        setReceiverError("Nhập tên người nhận!");
      }
      if (address === "") {
        setAddressError("Nhập địa chỉ nhận!");
      }
      if (OTP === "") {
        setOTPError("Nhập OTP!");
      }
    }
  };

  const addDetailOrder = (maDonHang) => {
    cart.forEach(async (item) => {
      try {
        console.log(
          item.sanPham.donGia - (item.sanPham.donGia * item.giamGia) / 100
        );
        const detailOrder = await detailOrderApi.addDetailOrder(
          maDonHang,
          item.sanPham.maSanPham,
          {
            soLuong: item.soLuong,
            donGia:
              item.sanPham.donGia - (item.sanPham.donGia * item.giamGia) / 100,
          }
        );
      } catch (error) {
        console.log(error, "addDetailOrder");
      }
    });
  };

  const deleteCart = async () => {
    try {
      const deleteMyCart = await cartApi.deleteCart(token);
    } catch (error) {
      console.log(error, "deleteCart");
    }
  };

  const RadioPay = ({ text, icon, color, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Icon
            style={{
              color: COLORS.primary,
            }}
            name={icon}
            size={20}
          />
          <Text style={{ marginLeft: 15, fontSize: 20 }}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        marginTop: 10,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          marginTop: 30,
          paddingHorizontal: 20,
        }}
      >
        <FormInput
          lable="Người nhận"
          defaultValue={receiver}
          onChange={(value) => {
            setReceiver(value);
            setReceiverError("");
          }}
          errorMsg={receiverError}
        />
        <FormInput
          lable="Địa chỉ"
          defaultValue={address}
          onChange={(value) => {
            setAddress(value);
            setAddressError("");
          }}
          errorMsg={addressError}
        />
        <View style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 20 }}>Phương thức thanh toán</Text>
          <View
            style={{
              marginBottom: 20,
              marginTop: 10,
              borderRadius: 15,
              elevation: 13,
              backgroundColor: COLORS.white,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            {PAYMENT.map((item, index) => (
              <RadioPay
                key={index}
                text={item}
                icon={
                  selectedPay === index
                    ? "radio-button-checked"
                    : "radio-button-off"
                }
                onPress={() => setSelectedPay(index)}
              />
            ))}
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            marginTop: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <FormInput
              lable="Nhập mã OTP"
              onChange={(value) => {
                setOTP(value);
                setOTPError("");
              }}
              errorMsg={OTPError}
            />
          </View>
          <SecondaryButton
            title="Gửi OTP"
            btnContainerStyle={{
              backgroundColor: COLORS.primary,
              paddingHorizontal: 15,
              paddingVertical: 15,
              borderRadius: 20,
              marginLeft: 20,
              marginTop: 30,
            }}
            labelStyle={{ color: COLORS.white }}
            onPress={handleSendOTP}
          />
        </View>
      </ScrollView>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          elevation: 99,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>Tổng: </Text>
          <Text style={{ fontSize: 20 }}>{total}</Text>
        </View>
        <SecondaryButton
          title="Đặt hàng"
          btnContainerStyle={styles.btnOrder}
          labelStyle={{
            color: COLORS.white,
          }}
          onPress={() => handleOrder()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    // paddingHorizontal: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    height: 130,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  btnOrder: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 15,
    width: 300,
    marginBottom: 30,
  },
});

export default DeliverScreen;
