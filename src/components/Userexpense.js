import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import React, {useState} from 'react'
import { COLORS } from '../constants'
import avatar from "../assets/icons/avatar.png"

const Userexpense = ({orderValue, loyaltyUsed, cashCollected, loyaltyRewarded }) => {

  const [expanded, setExpanded] = useState(false);

  const expense = parseInt(orderValue.slice(1)) - parseInt(loyaltyUsed.slice(1));
  
  const toggleAccordion = () => {
    setExpanded(!expanded);
  }

  return (
    <View style = {styles.userexpense}>
      <TouchableOpacity onPress={toggleAccordion}>
            <View style={styles.first}>
            <Image source={avatar} style={styles.avatar} />
              <Text style={styles.userName}>Pankaj Sharma</Text>
              <Text style={styles.price}>₹{expense}</Text>
            </View>
       </TouchableOpacity>
       {expanded &&
            <View style={styles.additionalContent}>
              <View style={styles.boxContainer}>
                <View style={styles.box}>
                <Text style={styles.boxPrice}>{orderValue}</Text>
                  <Text style={styles.boxText}>Order Value</Text>
                 
                </View>
                <View style={styles.box}>
                <Text style={styles.boxPrice}>{loyaltyUsed}</Text>
                  <Text style={styles.boxText}>Loyalty Used</Text>
                
                </View>
                <View style={styles.box}>
                <Text style={styles.boxPrice}>{cashCollected}</Text>
                  <Text style={styles.boxText}>Cash Collected</Text>
                
                </View>
                <View style={styles.box}>
                <Text style={styles.boxPrice}>{loyaltyRewarded}</Text>
                  <Text style={styles.boxText}>Loyalty Rewarded</Text>
                 
                </View>
              </View>
            </View>
          }
      </View>
  )
}

export default Userexpense

const styles = StyleSheet.create({

   
     userexpense:{

        marginTop:10,
        marginBottom:-20
      },
    
    
      first:{
    
        backgroundColor:"#f2e9d0",
        width:320,
        height:60,
        borderRadius:10,
        margin:10,
        flexDirection:"row",
        padding:10,
        justifyContent:"space-around"
    
      },
    
    
      additionalContent: {
        backgroundColor: "#f2e9d0",
        width: 320,
        height: 100, // Adjust height as needed
        borderRadius: 10,
        margin: -10,
        marginBottom:15,
        marginLeft:10
      },
    
      avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      },
    
      userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop:7
      },
      price: {
        fontSize: 14,
        marginTop:7,
        fontWeight: 'bold',
      },
      boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
      },
    
      box: {
        width: 70,
        height: 70,
        backgroundColor: '#d9c284',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginTop:13
      },
    
      boxText: {
        fontSize: 12,
        color: COLORS.black,
        marginBottom: 5,
        
      },
    
      boxPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
      },
    
})