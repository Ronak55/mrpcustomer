import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import {COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import DropShadow from "react-native-drop-shadow";
import { useSelector } from "react-redux";

function Loyalty({navigation}) {
  const vendor = useSelector((state) => state.vendor.vendor);
  const [loyaltyRewardPer, onChangeLoyaltyRewardPer] = useState('');
  const [loyaltyRedeemPer, onChangeLoyaltyRedeemPer] = useState('');
  const [loyaltyMinOrderValue, onChangeLoyaltyMinOrderValue] = useState('');
  const [loyaltyProgramName, onChangeLoyaltyProgramName] = useState('');
  const [loyaltyProgramDetails, setLoyaltyProgramDetails] = useState({"loyalty_program":{
    "program_name": '',
    "award_percentage" : '',
    "redeem_percentage" : '',
    "min_sale_for_award" : '',
    "min_sale_for_redeem" : '',
  }});

  useEffect(() => {
    console.log("api load");
    let getLoyaltyProgram = () => {
      let requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "sellerId": parseFloat(vendor.sellerid),
        }),
      };
  
      fetch("http://13.200.100.28:5000/api/getLoyaltyProgram", requestOptions)
      .then(response => response.json())
      .then(async loyalty_program => {
        const x = await loyalty_program;
        console.log(loyalty_program);
        setLoyaltyProgramDetails(loyalty_program);
      })
      .catch(error => console.log('error', error));
    };
    getLoyaltyProgram();
  }, []);

  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={styles.main}>
      <View style={styles.container}>
        <DropShadow style={styles.card}>
           <Text style={styles.cardHeading}>{loyaltyProgramDetails.loyalty_program.program_name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.cardDetail}>Reward : {loyaltyProgramDetails.loyalty_program.award_percentage}%</Text>
            <Text style={styles.cardDetail}>Redeem : {loyaltyProgramDetails.loyalty_program.redeem_percentage}%</Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.cardDetail}>Min. Order Value for Reward : {loyaltyProgramDetails.loyalty_program.min_sale_for_award}</Text>
            <Text style={styles.cardDetail}>Min. Order Value for Redeem : {loyaltyProgramDetails.loyalty_program.min_sale_for_redeem}</Text>
          </View> 
        <Text></Text>
        </DropShadow>
        {/* <View style={styles.wFull}>
        <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Program Name"
            inputMode="text"
            maxLength={3}
            onChangeText={onChangeLoyaltyProgramName}
            value={loyaltyProgramName}
            placeholderTextColor={COLORS.gray}
          />
          <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Set Reward %"
            inputMode="numeric"
            maxLength={3}
            onChangeText={onChangeLoyaltyRewardPer}
            value={loyaltyRewardPer}
            placeholderTextColor={COLORS.gray}
          />
          <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Set Redeem %"
            inputMode="numeric"
            maxLength={3}
            onChangeText={onChangeLoyaltyRedeemPer}
            value={loyaltyRedeemPer}
            placeholderTextColor={COLORS.gray}
          />
          <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Set Min Order Value"
            inputMode="numeric"
            maxLength={5}
            onChangeText={onChangeLoyaltyMinOrderValue}
            value={loyaltyMinOrderValue}
            placeholderTextColor={COLORS.gray}
          />
          <View style={styles.loginBtnWrapper}>
            <LinearGradient
              colors={[COLORS.gradientForm, COLORS.primary]}
              style={styles.linearGradient}
              start={{y: 0.0, x: 0.0}}
              end={{y: 1.0, x: 0.0}}>
             
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.ORDER_PUNCH, {userId: 'X0001',})}
                activeOpacity={0.7}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Create Loyalty Program</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View> */}
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
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    height: 55,
    paddingVertical: 0,
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
  card: {
    width: '100%',
    color: COLORS.white,
    backgroundColor: COLORS.lightBlack,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    padding: 15,
    borderRadius: 20,
    marginBottom: 15
  },
  cardHeading:{
    color: COLORS.white,
    fontSize : 27,
 
  },
  cardDetail:{
    color: COLORS.white,
    fontSize: 16,
    paddingRight: 40,
    paddingTop: 10,
  }
});

export default Loyalty;
