import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ROUTES } from '../../constants';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch } from 'react-redux';
import { addVendorDetail } from "../../store/vendorSlice";

function Login({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [cusType, setCusType] = useState('');
  const dispatch = useDispatch();

  const data = [
    { label: 'Vendor', value: 'seller' },
    { label: 'Customer', value: 'customer' },
  ];

  const getUserDetails = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, accountType: cusType, password }),
        redirect: 'follow'
      };

      const response = await fetch("http://13.200.100.28:5000/api/fetchAuthDetails", requestOptions);
      const result = await response.json();

      if (result.sellerid) {
        dispatch(addVendorDetail(result));
        navigation.navigate(ROUTES.ORDER);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAwareScrollView
        style={{ width: '100%' }}
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        <View style={styles.container}>
          <View style={styles.wFull}>
            <View style={styles.row}>
              <Text style={styles.brandName}>MRP</Text>
            </View>
            <Text style={styles.loginContinueTxt}>Login to continue</Text>
            <TextInput
              style={styles.input}
              clearButtonMode="always"
              placeholder="Phone Number"
              inputMode="numeric"
              maxLength={10}
              onChangeText={setPhoneNumber}
              textContentType="username"
              value={phoneNumber}
              placeholderTextColor={COLORS.gray}
            />
            <TextInput
              style={styles.input}
              clearButtonMode="always"
              placeholder="Password"
              inputMode="text"
              maxLength={10}
              onChangeText={setPassword}
              textContentType="password"
              value={password}
              secureTextEntry={true}
              placeholderTextColor={COLORS.gray}
            />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Customer Type"
              searchPlaceholder="Search..."
              value={cusType}
              onChange={item => { setCusType(item.value); }}
            />
            <View style={styles.loginBtnWrapper}>
              <LinearGradient
                colors={[COLORS.lightBlack, COLORS.primary, COLORS.lightBlack]}
                style={styles.linearGradient}
                start={{ y: 0.0, x: 0.0 }}
                end={{ y: 0.0, x: 1.0 }}
              >
                <TouchableOpacity
                  onPress={getUserDetails}
                  activeOpacity={0.7}
                  style={styles.loginBtn}
                >
                  <Text style={styles.loginText}>Log In</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD, { userId: 'X0001' })}
              style={styles.forgotPassBtn}
            >
              <Text style={styles.forgotPassText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}> Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.REGISTER, { userId: 'X0001' })}
            >
              <Text style={styles.signupBtn}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.bgColor,
  },
  scroll:{

    width: '100%'

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



  imageBg: {
    flex: 1,
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.primary,
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    color: COLORS.white,
    marginBottom: 16,
    fontWeight: 'bold',
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
    color: COLORS.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom:160,
    fontSize: 15,
  },
  // footer
  footer: {
    position: 'absolute',
  
    bottom: -10,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  signupBtn: {
    color: COLORS.primary,
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
  dropdown: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
  },
  placeholderStyle: {
    color: COLORS.grayLight,
  },
  selectedTextStyle: {
    color: COLORS.grayLight,
  },
  inputSearchStyle: {},
});
