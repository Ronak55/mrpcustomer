import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Home from '../screens/home/Home.js';
import LinearGradient from 'react-native-linear-gradient';
import { ROUTES } from '../constants';

const golden = '#E18421';
const SwitchButton = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 50,
          height: 60,
          borderWidth: 0.5,
          backgroundColor: 'white',
          borderRadius: 15,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 5,
          elevation: 2, // Set the elevation (z-index) for SwitchButton
          zIndex: 2, // Optional: Set the zIndex for SwitchButton
          paddingRight: 5,
        
        }}>
        <TouchableOpacity
          style={{
            width: '50%',
            height: 50,
            backgroundColor: selectedTab == 0 ? golden : 'white',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Text
            style={{
              color: selectedTab == 0 ? '#fff' : '#000',
              fontSize: 18,
              fontWeight: '700',
            }}>
            store
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            height: 50,
            backgroundColor: selectedTab == 1 ? golden : 'white',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {

            selectedTab(1);
            // navigation.navigate(ROUTES.OFFERS);
          }}>
          <Text
            style={{
              color: selectedTab == 1 ? '#fff' : '#000',
              fontSize: 18,
              fontWeight: '700',
            }}>
            offers
          </Text>
        </TouchableOpacity>
      </View>
      <View>
      {selectedTab == 0 ? (
      <View style = {{elevation: 1, zIndex: 1}}>
       <Home />
       </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         
          <Text>offers</Text>
        </View>
      )}
      </View>
    </View>
  );
};

export default SwitchButton;
