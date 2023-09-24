import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView, TextInput, TouchableOpacity, Image, Switch
} from 'react-native';
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import DropShadow from "react-native-drop-shadow";
import { useSelector } from "react-redux";
import editicon from "../../assets/icons/editicon.png"
import staricon from "../../assets/icons/star.png"
import diamondicon from "../../assets/icons/diamond.png"
import kingicon from "../../assets/icons/king.png"

function Loyalty({ navigation }) {

  const [orderValue, setOrderValue] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleInputChange = (text) => {
    setOrderValue(text);
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.review}>
          <Text style={styles.reviewtext}>Review Your Basic Loyalty</Text>
          <Text style={styles.reviewtext}>Settings</Text>
        </View>
        <View style={styles.setloyalty}>
          <View style={styles.setloyaltyfirst}>
            <Text style={styles.setloyaltyfirsttext}>
              Set Default Loyalty Reward Percentage
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric" // To allow only numeric input
              placeholder="Enter percentage"

            />
            <TouchableOpacity style={{ position: "absolute", right: 10, top: 50 }}>
              <Image source={editicon} style={{ width: 20, height: 20 }}></Image>
            </TouchableOpacity>

          </View>

          <View style={styles.setloyaltysecond}>
            <Text style={styles.setloyaltysecondtext}>
              Set Minimum Order Value
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.inputsecond}
                keyboardType="numeric"
                placeholder="100"
                value={orderValue}
                onChangeText={handleInputChange}
              />
              <TouchableOpacity style={{ position: "absolute", right: 10, top: 10 }}>
                <Image source={editicon} style={{ width: 20, height: 20 }}></Image>
              </TouchableOpacity>

            </View>
            {parseInt(orderValue) < 100 && (
              <Text style={styles.warningText}>
                Value must be greater than or equal to ₹100
              </Text>
            )}
          </View>

        </View>

        <View style={styles.tieredloyalty}>
          <Text style={styles.loyaltytext}>Tiered loyalty</Text>

            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? 'black' : COLORS.primary}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View style = {styles.rewards}>
            <View style = {styles.first}>
              <Image source = {staricon} style = {{width: 50, height: 50, marginRight:10}}></Image>

              <View style = {styles.rowtext}>

              <Text style = {styles.rewardtextone}>Star</Text>
              <Text style = {styles.rewardtext}>Shops 2 times every Week</Text>
              <Text style = {styles.rewardtext}>Gets 1% loyalty points on each order</Text>

              </View>
            
              <TouchableOpacity style={{marginLeft: 60}}>
                <Image source={editicon} style={{ width: 20, height: 20, }}></Image>
              </TouchableOpacity>
              
            </View>

            <View style = {styles.first}>
              <Image source = {diamondicon} style = {{width: 50, height: 50,  marginRight:10}}></Image>

              <View style = {styles.rowtext}>

              <Text style = {styles.rewardtextone}>Diamond</Text>
              <Text style = {styles.rewardtext}>Shops 4 times every Week</Text>
              <Text style = {styles.rewardtext}>Gets 2% loyalty points on each order</Text>

              </View>
            
              <TouchableOpacity style={{marginLeft: 60}}>
                <Image source={editicon} style={{ width: 20, height: 20 }}></Image>
              </TouchableOpacity>
              
            </View>

            <View style = {styles.first}>
              <Image source = {kingicon} style = {{width: 50, height: 50,  marginRight:10}}></Image>

              <View style = {styles.rowtext}>

              <Text style = {styles.rewardtextone}>King</Text>
              <Text style = {styles.rewardtext}>Shops 5 times every Week</Text>
              <Text style = {styles.rewardtext}>Gets 3% loyalty points on each order</Text>

              </View>
            
              <TouchableOpacity style={{marginLeft: 60}}>
                <Image source={editicon} style={{ width: 20, height: 20 }}></Image>
              </TouchableOpacity>
              
            </View>
          </View>
  
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 25,
    backgroundColor: COLORS.white,
  },


  review: {
    width: "100%"
  },

  reviewtext: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black"
  },

  setloyalty: {

    marginTop: 20

  },

  setloyaltyfirst: {
    width: "100%",
    position: "relative"
  },

  setloyaltysecond: {
    marginTop: 20,
    position: "relative"
  },

  setloyaltyfirsttext: {

    fontSize: 16,
    fontWeight: "bold",

  },

  setloyaltysecondtext: {

    fontSize: 16,
    fontWeight: "bold",

  },
  input: {
    width: '100%',
    height: 45,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 15,
    paddingLeft: 10,
    borderRadius: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },

  currencySymbol: {
    fontSize: 20,
    marginRight: 5,
  },

  inputsecond: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },

  warningText: {
    color: 'red',
    marginTop: 5,
  },

  tieredloyalty: {

    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20

  },
  loyaltytext: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold"
  },
  
  rewards:{

    flexDirection:"column",
  
  },

  first:{

    flexDirection:"row",
    marginTop: 25

  },

  rewardtextone:{

    fontSize:16
  },

  rewardtext:{

    fontSize:11,
    fontWeight:"bold"
  }





});

// function Loyalty({navigation}) {
//   const vendor = useSelector((state) => state.vendor.vendor);
//   const [loyaltyRewardPer, onChangeLoyaltyRewardPer] = useState('');
//   const [loyaltyRedeemPer, onChangeLoyaltyRedeemPer] = useState('');
//   const [loyaltyMinOrderValue, onChangeLoyaltyMinOrderValue] = useState('');
//   const [loyaltyProgramName, onChangeLoyaltyProgramName] = useState('');
//   const [loyaltyProgramDetails, setLoyaltyProgramDetails] = useState({"loyalty_program":{
//     "program_name": '',
//     "award_percentage" : '',
//     "redeem_percentage" : '',
//     "min_sale_for_award" : '',
//     "min_sale_for_redeem" : '',
//   }});

//   useEffect(() => {
//     console.log("api load");
//     let getLoyaltyProgram = () => {
//       let requestOptions = {
//         method: 'POST',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//           "sellerId": parseFloat(vendor.sellerid),
//         }),
//       };

//       fetch("http://13.200.100.28:5000/api/getLoyaltyProgram", requestOptions)
//       .then(response => response.json())
//       .then(async loyalty_program => {
//         const x = await loyalty_program;
//         console.log(loyalty_program);
//         setLoyaltyProgramDetails(loyalty_program);
//       })
//       .catch(error => console.log('error', error));
//     };
//     getLoyaltyProgram();
//   }, []);

//   return (
//     <SafeAreaView
//       // eslint-disable-next-line react-native/no-inline-styles
//       style={styles.main}>
//       <View style={styles.container}>
//         <DropShadow style={styles.card}>
//            <Text style={styles.cardHeading}>{loyaltyProgramDetails.loyalty_program.program_name}</Text>
//           <View style={{flexDirection: 'row'}}>
//             <Text style={styles.cardDetail}>Reward : {loyaltyProgramDetails.loyalty_program.award_percentage}%</Text>
//             <Text style={styles.cardDetail}>Redeem : {loyaltyProgramDetails.loyalty_program.redeem_percentage}%</Text>
//           </View>
//           <View style={{flexDirection: 'column'}}>
//             <Text style={styles.cardDetail}>Min. Order Value for Reward : {loyaltyProgramDetails.loyalty_program.min_sale_for_award}</Text>
//             <Text style={styles.cardDetail}>Min. Order Value for Redeem : {loyaltyProgramDetails.loyalty_program.min_sale_for_redeem}</Text>
//           </View> 
//         <Text></Text>
//         </DropShadow>
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
{/* </View>
    </SafeAreaView>
  );
} */}
// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 25,
//     backgroundColor: COLORS.white,
//   },


//   container: {
//     padding: 15,
//     width: '100%',
//     position: 'relative',
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.white,
//   },


//   input: {
//     borderWidth: 1,
//     borderColor: COLORS.grayLight,
//     borderRadius: 5,
//     padding: 15,
//     marginVertical: 10,
//     height: 55,
//     paddingVertical: 0,
//   },
//   placeholderStyle: {
//     color: COLORS.grayLight,
//   },
//   selectedTextStyle: {
//     color: COLORS.grayLight,
//   },
//   // Login Btn Styles
//   loginBtnWrapper: {
//     height: 55,
//     marginTop: 12,
//     shadowColor: COLORS.dark,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.4,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   linearGradient: {
//     width: '100%',
//     borderRadius: 50,
//   },
//   loginBtn: {
//     textAlign: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     height: 55,
//   },
//   loginText: {
//     color: COLORS.lightBlack,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   // utils
//   wFull: {
//     width: '100%',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   mr7: {
//     marginRight: 7,
//   },
//   card: {
//     width: '100%',
//     color: COLORS.white,
//     backgroundColor: COLORS.lightBlack,
//     shadowColor: COLORS.primary,
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.5,
//     shadowRadius: 2,
//     padding: 15,
//     borderRadius: 20,
//     marginBottom: 15
//   },
//   cardHeading:{
//     color: COLORS.white,
//     fontSize : 27,

//   },
//   cardDetail:{
//     color: COLORS.white,
//     fontSize: 16,
//     paddingRight: 40,
//     paddingTop: 10,
//   }
// });

export default Loyalty;
