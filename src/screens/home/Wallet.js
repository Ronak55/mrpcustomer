import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image} from 'react-native'
import React, {useState} from 'react';
import { COLORS } from '../../constants';
import search from "../../assets/icons/search.png"
import Userexpense from '../../components/Userexpense';

const Wallet = ({navigation}) => {

  return (

    <View style = {styles.container}>
    <View style={styles.searchContainer}>
     <Image source={search} style = {styles.icon}/>
      <TextInput
        style={styles.input}
        placeholder="Search Transactions"
        placeholderTextColor="gray"
      />
    </View>
<ScrollView>
    <View style = {styles.transactions}>
      <View style = {styles.month}>
        <Text style = {styles.monthtext}>
           September 2023
        </Text>
        <Text style = {styles.monthlyexpense}>
        ₹340
        </Text>
      </View>
      <Userexpense
          orderValue="₹100"
          loyaltyUsed="₹5"
          cashCollected="₹95"
          loyaltyRewarded="₹5" 
        />
        <Userexpense
          orderValue="₹120"
          loyaltyUsed="₹10"
          cashCollected="₹150"
          loyaltyRewarded="₹20"
         
        />
          <Userexpense
          orderValue="₹100"
          loyaltyUsed="₹5"
          cashCollected="₹150"
          loyaltyRewarded="₹40"
        />
    </View>
    <View style = {styles.transactions}>
      <View style = {styles.month}>
        <Text style = {styles.monthtext}>
           August 2023
        </Text>
        <Text style = {styles.monthlyexpense}>
        ₹440
        </Text>
      </View>
      <Userexpense
          orderValue="₹100"
          loyaltyUsed="₹5"
          cashCollected="₹95"
          loyaltyRewarded="₹5"

        />
        <Userexpense
          orderValue="₹120"
          loyaltyUsed="₹10"
          cashCollected="₹150"
          loyaltyRewarded="₹20"
        />
          <Userexpense
          orderValue="₹100"
          loyaltyUsed="₹5"
          cashCollected="₹150"
          loyaltyRewarded="₹40"
        />
    </View>
    </ScrollView>
    </View>
  )
}

export default Wallet

const styles = StyleSheet.create({

  container:{

    flex:1,
    backgroundColor:COLORS.white
  },
  icon:{
    width:20,
    height:20,
    marginRight:10
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor:COLORS.black,
    margin: 25,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  transactions:{
    margin:30

  },

  month:{
    flexDirection:"row",
    justifyContent:"space-between"

  },

  monthtext:{

    fontWeight:"500",
    fontSize:15
  },
  monthlyexpense:{
    fontWeight:"500",
    fontSize:15
  },


})