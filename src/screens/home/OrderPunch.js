import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, ROUTES} from '../../constants';
import { useSelector } from "react-redux";


function OrderPunch({navigation}) {
  const [saleAmount, setSaleAmount] = React.useState('0');
  const [showComp, setShowComp] = React.useState(false);
  const [rewardMRP , setRewardMRP] = React.useState(0);
  const [redeemMRP , setRedeemMRP] = React.useState(0);
  const [amountToCollect , setAmountToCollect] = React.useState(0);

  const vendor = useSelector((state) => state.vendor.vendor);
  const customer = useSelector((state) => state.customer.customer);

  const calculateLoyalty = (e) => {
    setSaleAmount(e);
    if(e >= vendor.loyalty_program.min_sale_for_redeem){
      let requestLoyalty = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "sellerId" : parseFloat(vendor.sellerid),
          "customerId": parseFloat(customer.customerid),
          "orderValue": parseFloat(e),
        }),
        redirect: "follow",
      };
      fetch("http://13.200.100.28:5000/api/showTransactionDetails", requestLoyalty)
      .then(response => response.json())
      .then(result => {
        console.log("show transaction", result);
        setAmountToCollect(result.cash_to_collect);
        setRewardMRP(result.reward_amount);
        setRedeemMRP(result.redeem_amount);
        setShowComp(true);
      })
      .catch(error => console.log('error', error));
    }else{
      setShowComp(false);
    }
  };

  const processTransaction = () => {
      let requestProcess = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "sellerId" : parseFloat(vendor.sellerid),
          "customerId": parseFloat(customer.customerid),
          "orderValue": parseFloat(saleAmount),
        }),
        redirect: "follow",
      };
      fetch("http://13.200.100.28:5000/api/processTransaction", requestProcess)
      .then(response => response.json())
      .then(result => {
        if(result.saleTransactionID){
         navigation.navigate(ROUTES.ORDER)
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={styles.main}>
      <View style={styles.container}>
        <View style={styles.wFull}>
          <Text style={styles.orderTitle}>{customer.name}</Text>
          <Text style={styles.orderTitle}>{customer.phonenumber}</Text>
          <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Sale Amount"
            inputMode="numeric"
            maxLength={10}
            onChangeText={(e)=> calculateLoyalty(e)}
            value={saleAmount}
            placeholderTextColor={COLORS.gray}
          />
          { showComp && 
          <View>
            <Text style={styles.orderTitle}> Summary </Text>
            <Text style={styles.orderTitle}> Total Value - INR  { saleAmount } </Text>
            <Text style={styles.orderTitle}> MRP Redeemed - INR { redeemMRP } </Text>
            <Text style={styles.orderTitle}> MRP Rewarded - INR { rewardMRP } </Text>
            <View style={styles.loginBtnWrapper}>
              <LinearGradient
                colors={[COLORS.gradientForm, COLORS.primary]}
                style={styles.linearGradient}
                start={{y: 0.0, x: 0.0}}
                end={{y: 1.0, x: 0.0}}>
                {/******************** LOGIN BUTTON *********************/}
                <TouchableOpacity
                  onPress={() => processTransaction()}
                  activeOpacity={0.7}
                  style={styles.loginBtn}>
                  <Text style={styles.loginText}>Collect INR {amountToCollect} </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
          }
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.bgColor,
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bgColor,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
    color: COLORS.white,
    fontSize: 16,
  },
  placeholderStyle: {
    color: COLORS.grayLight,
  },
  selectedTextStyle: {
    color: COLORS.grayLight,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  linearGradient: {
    width: '100%',
    borderRadius: 50,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
  },
  loginText: {
    color: COLORS.lightBlack,
    fontSize: 18,
    fontWeight: 'bold',
  },
  // utils
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
  orderTitle:{
    color: COLORS.white,
  }
});

export default OrderPunch;
