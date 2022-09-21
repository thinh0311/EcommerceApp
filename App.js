import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StripeProvider } from "@stripe/stripe-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import COLORS from "./src/consts/colors";
import OnBoardScreen from "./src/views/screens/OnBoardScreen";
import FavoriteScreen from "./src/views/screens/FavoriteScreen";
import ContactScreen from "./src/views/screens/ContactScreen";
import SettingScreen from "./src/views/screens/SettingScreen";
import DetailsScreen from "./src/views/screens/DetailsScreen";
import CartScreen from "./src/views/screens/CartScreen";
import NotifyScreen from "./src/views/screens/NotifyScreen";
import ProfileScreen from "./src/views/screens/ProfileScreen";
import InfoUserScreen from "./src/views/screens/InfoUserScreen";
import SignIn from "./src/views/Authentication/SignIn";
import SignUp from "./src/views/Authentication/SignUp";
import OrderScreen from "./src/views/screens/OrderScreen";
import DeliverScreen from "./src/views/screens/DeliverScreen";
import SuccessScreen from "./src/views/screens/SuccessScreen";
import BottomNavigator from "./src/views/navigation/BottomNavigator";
import PasswordScreen from "./src/views/screens/PasswordScreen";
import GetAccountScreen from "./src/views/screens/GetAccountScreen";
import ForgotPassword from "./src/views/Authentication/ForgotPassword";
import DetailOrderScreen from "./src/views/screens/DetailOrderScreen";
import PaymentScreen from "./src/views/screens/PaymentScreen";

const PUBLISHABLE_KEY =
  "pk_test_51Lc8EsBRfoI5EEBCGtH8PMhbH3wEW7mnG1d4jRsn3DZuQtybHT6Wk7bhRWM9cSW4XliTr1h7VMQsQ42Hgg3htB4600u992LIkc";
const Stack = createStackNavigator();

const App = () => {
  return (
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-context" />
        <Stack.Navigator
          screenOptions={{ headerShown: true }}
          initialRouteName="BoardScreen"
        >
          <Stack.Screen
            name="BoardScreen"
            component={OnBoardScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Home"
            component={BottomNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: "Giỏ hàng" }}
          />
          <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{ title: "Thông tin sản phẩm" }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ title: "Quên mật khẩu" }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "Đăng ký" }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="Favorite"
            component={FavoriteScreen}
            options={{ title: "Sản phẩm ưa thích" }}
          />
          <Stack.Screen
            name="Contact"
            component={ContactScreen}
            options={{ title: "Liên hệ" }}
          />
          <Stack.Screen
            name="Setting"
            component={SettingScreen}
            options={{ title: "Cài đặt" }}
          />
          <Stack.Screen name="Notify" component={NotifyScreen} />
          <Stack.Screen
            name="InfoUser"
            component={InfoUserScreen}
            options={{ title: "Thông tin tài khoản" }}
          />
          <Stack.Screen
            name="Order"
            component={OrderScreen}
            options={{ title: "Đơn hàng" }}
          />
          <Stack.Screen
            name="Deliver"
            component={DeliverScreen}
            options={{ title: "Thông tin giao hàng" }}
          />
          <Stack.Screen
            name="SuccessOrder"
            component={SuccessScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailOrder"
            component={DetailOrderScreen}
            options={{ title: "Chi tiết đơn hàng" }}
          />
          <Stack.Screen
            name="Password"
            component={PasswordScreen}
            options={{ title: "Đổi mật khẩu" }}
          />
          <Stack.Screen
            name="GetAccount"
            component={GetAccountScreen}
            options={{ title: "Lấy lại mật khẩu" }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ title: "Thanh toán Stripe" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
