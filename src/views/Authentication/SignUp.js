import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AuthLayout from "./AuthLayout";
import COLORS from "../../consts/colors";
import FormInput from "../components/FormInput";
import utils from "../../utils/Ultils";
import Button, { SecondaryButton } from "../components/Button";
import DateTime from "../components/DateTime";
import accountApi from "../../api/accountApi";
import ModalComponent from "../components/ModalComponent";

const SignUp = ({ navigation }) => {
  const [account, setAccount] = React.useState("");
  const [accountError, setAccountError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [passError, setPassError] = React.useState("");
  const [confirmPassError, setConfirmPassError] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  // const [emailError, setEmailError] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const [showModal, setShowModal] = React.useState(false);

  function isEnabledSignUp() {
    return (
      account !== "" &&
      accountError === "" &&
      password !== "" &&
      email !== "" &&
      emailError === "" &&
      confirmPass !== "" &&
      passError === "" &&
      confirmPassError === "" &&
      username !== "" &&
      birthday !== "" &&
      address !== "" &&
      phone !== ""
    );
  }

  const checkPass = () => password === confirmPass;

  const checkAccount = async () => {
    try {
      const resutl = await accountApi.checkAccount(account);
      if (resutl !== "") {
        return resutl;
      }
    } catch (error) {
      console.log(error, "checkAccount");
    }
  };

  const handleBtnSignUp = async () => {
    const maTK = await checkAccount();
    console.log(maTK);
    if (maTK === undefined) {
      if (checkPass()) {
        let data = {
          email: email,
          passWord: password,
          hoTen: username,
          anhDaiDien: "",
          diaChi: address,
          sdt: phone,
        };
        try {
          const result = await accountApi.addAccount(data);
          setShowModal(!showModal);
        } catch (error) {
          console.log(error, "addAccount");
        }
      } else {
        setConfirmPassError("M???t kh???u x??c nh???n sai");
      }
    }
  };
  return (
    <>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>????ng k??</Text>
        </View>
      </TouchableOpacity> */}
      <AuthLayout
        title="????ng k?? t??i kho???n"
        subtitle="T???o m???t t??i kho???n ????? ti???p t???c"
        titleContainerStyle={{
          marginTop: 20,
        }}
      >
        {/* Form Input and SignUp */}
        <ScrollView
          style={{
            flex: 1,
            marginTop: 15,
          }}
        >
          <FormInput
            lable="Email"
            placeholder="nguyenvana@gmail.com"
            keyboardType="email-address"
            autoCompleteType="email"
            onChange={(value) => {
              utils.validateEmail(value, setEmailError);
              setEmail(value);
            }}
            errorMsg={emailError}
            appendComponent={
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{
                    color:
                      email == "" || (email != "" && emailError == "")
                        ? COLORS.green
                        : COLORS.red,
                  }}
                  name={
                    email == "" || (email != "" && emailError == "")
                      ? "check-circle-outline"
                      : "warning"
                  }
                  size={20}
                />
              </View>
            }
          />

          <FormInput
            lable="M???t kh???u"
            autoCompleteType="password"
            secureTextEntry={!showPass}
            containerStyle={{
              marginTop: 20,
            }}
            onChange={(value) => {
              utils.validatePassword(value, setPassError);
              setPassword(value);
            }}
            errorMsg={passError}
            appendComponent={
              <TouchableOpacity
                style={{
                  width: 40,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setShowPass(!showPass);
                }}
              >
                <Icon
                  style={{
                    color: showPass ? COLORS.dark : COLORS.grey,
                  }}
                  name="remove-red-eye"
                  size={20}
                />
              </TouchableOpacity>
            }
          />
          <FormInput
            lable="Nh???p l???i m???t kh???u"
            autoCompleteType="password"
            secureTextEntry={!showConfirmPass}
            containerStyle={{
              marginTop: 20,
            }}
            onChange={(value) => {
              utils.validatePassword(value, setConfirmPassError);
              setConfirmPass(value);
            }}
            errorMsg={confirmPassError}
            appendComponent={
              <TouchableOpacity
                style={{
                  width: 40,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setShowConfirmPass(!showConfirmPass);
                }}
              >
                <Icon
                  style={{
                    color: showConfirmPass ? COLORS.dark : COLORS.grey,
                  }}
                  name="remove-red-eye"
                  size={20}
                />
              </TouchableOpacity>
            }
          />
          <FormInput
            lable="H??? v?? t??n"
            containerStyle={{
              marginTop: 15,
            }}
            onChange={(value) => setUsername(value)}
            appendComponent={
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{
                    color: username !== "" ? COLORS.green : COLORS.red,
                  }}
                  name={username !== "" ? "check-circle-outline" : "warning"}
                  size={20}
                />
              </View>
            }
          />

          <FormInput
            lable="?????a ch???"
            containerStyle={{
              marginTop: 15,
            }}
            onChange={(value) => setAddress(value)}
            appendComponent={
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{
                    color: address !== "" ? COLORS.green : COLORS.red,
                  }}
                  name={address !== "" ? "check-circle-outline" : "warning"}
                  size={20}
                />
              </View>
            }
          />
          <FormInput
            lable="S??? ??i???n tho???i"
            containerStyle={{
              marginTop: 15,
            }}
            onChange={(value) => setPhone(value)}
            appendComponent={
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                <Icon
                  style={{
                    color: phone !== "" ? COLORS.green : COLORS.red,
                  }}
                  name={phone !== "" ? "check-circle-outline" : "warning"}
                  size={20}
                />
              </View>
            }
          />

          <View style={{ marginTop: 20 }}>
            <Button title="????ng K??" onPress={() => handleBtnSignUp()} />
          </View>
        </ScrollView>
      </AuthLayout>
      <ModalComponent
        showModal={showModal}
        title="T???o t??i kho???n th??nh c??ng"
        onPress={() => {
          setShowModal(!showModal);
          navigation.navigate("SignIn");
        }}
        icon="check-circle-outline"
        textBtn="????ng nh???p"
        // styleIcon
      />
      <View style={{ marginBottom: 20 }}></View>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    // paddingHorizontal: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },
});
export default SignUp;
