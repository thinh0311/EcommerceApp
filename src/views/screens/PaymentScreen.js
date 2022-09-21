import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useConfirmPayment, CardField } from "@stripe/stripe-react-native";

const API_URL = "https://aqueous-gorge-25769.herokuapp.com";

const PaymentScreen = ({ navigation, route }) => {
  const [total, emailToken] = route.params;
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  useEffect(() => {
    setEmail(emailToken);
    console.log(total, emailToken);
  }, []);

  // const rounding =(int)=>{
  //     if(int/23000)
  // }

  const fetchPaymentIntentClientSecret = async () => {
    const amount = Math.round(total / 23000 + "e+2") + "e-2";
    const response = await fetch(
      `${API_URL}/create-payment-intent?amount=${amount}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { clientSecret, error } = await response.json();
    console.log(error);
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    if (!cardDetails?.complete) {
      Alert.alert("Vui lòng nhập thông tin card");
      return;
    }
    const billingDetails = {
      email: email,
    };
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Lỗi thanh toán ${error.message}`);
        } else if (paymentIntent) {
          alert("Thanh toán thành công");
          navigation.navigate("SuccessOrder");
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={(value) => setEmail(value.nativeEvent.text)}
        style={styles.input}
        defaultValue={email}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />
      <Button onPress={handlePayPress} title="Thanh toán" disabled={loading} />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
