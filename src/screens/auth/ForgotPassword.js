import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ROUTES } from '../../constants';
import { useNavigation } from '@react-navigation/native';

function ForgotPassword() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handleUpdatePassword = () => {
    if (password !== verifyPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    fetch('http://13.200.100.28:5000/api/updatePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "phoneNumber": phoneNumber,
        "password": password,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          Alert.alert('Password updated successfully');
          navigation.navigate(ROUTES.LOGIN);
        } else {
          Alert.alert('Error updating password. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('An error occurred. Please try again later.');
      });
  };

  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.wFull}>
          <Text style={styles.loginContinueTxt}>Create New Password</Text>
          <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Phone Number"
            inputMode="numeric"
            maxLength={10}
            onChangeText={setPhoneNumber}
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
            value={password}
            placeholderTextColor={COLORS.gray}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Verify Password"
            inputMode="text"
            maxLength={10}
            onChangeText={setVerifyPassword}
            value={verifyPassword}
            placeholderTextColor={COLORS.gray}
            secureTextEntry={true}
          />

          <View style={styles.loginBtnWrapper}>
            <LinearGradient
              colors={[COLORS.lightBlack, COLORS.primary, COLORS.lightBlack]}
              style={styles.linearGradient}
              start={{ y: 0.0, x: 0.0 }}
              end={{ y: 0.0, x: 1.0 }}>
              <TouchableOpacity
                onPress={handleUpdatePassword}
                activeOpacity={0.7}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Update Password</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </KeyboardAvoidingView>
      
      <View style={styles.footer}>
          <Text style={styles.footerText}> Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REGISTER)}>
            <Text style={styles.signupBtn}>Sign Up</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.bgColor,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bgColor,
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
    width: 300,
    height: 55,
    paddingVertical: 0,
    color: COLORS.white,
    fontSize: 16,
  },
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
  footer: {
    position: 'absolute',
    bottom: 10,
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
  wFull: {
    width: '100%',
  },
});
