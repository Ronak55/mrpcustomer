import React, {useEffect, useState} from 'react';
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
import { useSelector, useDispatch } from "react-redux";
import { addCustomerDetail, deleteCustomerDetail } from "../../store/customerSlice";

function Order({ route, navigation }) {
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.vendor.vendor);

  const [phoneNumber, onChangePhoneNumber] = useState('');

  let getCustDetails = () => {
    let requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "phoneNumber": phoneNumber,
      }),
    };

    fetch("http://13.200.100.28:5000/api/getCustomerbyPhoneNumber", requestOptions)
    .then(response => response.text())
    .then(result => {
      if(result.customerid){
        dispatch(deleteCustomerDetail());
        dispatch(addCustomerDetail(result));
        navigation.navigate(ROUTES.ORDER_PUNCH);
      }
    })
    .catch(error => console.log('error', error));
  }

  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={styles.main}>
      <View style={styles.container}>
        <View style={styles.wFull}>
          <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Phone Number"
            inputMode="numeric"
            maxLength={10}
            onChangeText={onChangePhoneNumber}
            textContentType="username"
            value={phoneNumber}
            placeholderTextColor={COLORS.gray}
          />
          <View style={styles.loginBtnWrapper}>
            <LinearGradient
              colors={[COLORS.gradientForm, COLORS.primary]}
              style={styles.linearGradient}
              start={{y: 0.0, x: 0.0}}
              end={{y: 1.0, x: 0.0}}>
              {/******************** LOGIN BUTTON *********************/}
              <TouchableOpacity
                onPress={() => getCustDetails()}
                activeOpacity={0.7}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Punch Order</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
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
});

export default Order;
