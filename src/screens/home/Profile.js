import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, View } from 'react-native';

import usericon from "../../assets/icons/profileicon.png"
import cameraicon from "../../assets/icons/camera.jpg"

import editicon from "../../assets/icons/editicon.png"

import { COLORS } from "../../constants"

import { Dropdown } from 'react-native-element-dropdown';


import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { FloatingLabelInput } from 'react-native-floating-label-input';

import { Country, State, City }  from 'country-state-city';


const Profile = () => {

  const [selectedimage, setselectedimage] = useState(null)
  const [phone, setPhone] = useState('');
  const [name, setname] = useState('');
  const [storename, setstorename] = useState('');
  const [selectedbusiness, setselectedbusiness] = useState("");
  const [selectedstate, setselectedstate] = useState('');
  const [citydata, setcitydata] = useState([]);
  const [selectedcity, setselectedcity] = useState('');
  const [isFocus, setIsFocus] = useState(false);

const ImagePicker = ()=>{

  let options = {

    storageOptions:{
      path:"image"
    }
  }

  launchImageLibrary(options, response=>{

    setselectedimage(response.assets[0].uri)
    console.log(setselectedimage)
    console.log(response)
  })
}



 const statedata = State.getStatesOfCountry('IN').map(state => ({
  label: state.name,
  value: state.isoCode
}));

console.log(statedata);

console.log(selectedstate);

const handlestatechange = (state) => {
  
  setselectedstate(state);
  setIsFocus(false);
  
  const cities = City.getCitiesOfState('IN', state.value);
 
  setcitydata(cities.map(city => ({
      label: city.name,
      value: city.name
    })));


  console.log(citydata);

  
};


  const renderLabelone = () => {
    if (selectedbusiness || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'black' }]}>
          Select Business Type
        </Text>
      );
    }
    return null;
  };

  const renderLabeltwo = () => {
    if (selectedstate || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'black' }]}>
          Select State
        </Text>
      );
    }
    return null;
  };


  const renderLabelthree = () => {
    if (selectedcity || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'black' }]}>
          Select City
        </Text>
      );
    }
    return null;
  };


  const businessdata = [
    { label: 'Retail', value: 'retail' },
    { label: 'Wholesale', value: 'wholesale' }
  ];

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.profileicon}>
      {selectedimage ? (
          <Image source={{ uri: selectedimage }} style={styles.profileImage} />
        ) : (
          <Image source={usericon} style={styles.profileImage} />
        )}

        <TouchableOpacity style={styles.camerastyle} onPress={() => {ImagePicker()}}>
          <Image source={cameraicon} style={{ width: 30, height: 30, borderRadius: 12 }}></Image>
        </TouchableOpacity>
      </View>


      <ScrollView style={styles.inputfield}>

        <View style={styles.inputs}>
          <FloatingLabelInput
            label="Name"
            value={name}
            staticLabel
            hintTextColor={'#aaa'}
            keyboardType="default"
            hint="Enter your name"
            containerStyles={{
              borderWidth: 2,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              borderColor: 'black',
              borderRadius: 8,
            }}
            customLabelStyles={{
              colorFocused: COLORS.primary,
              fontSizeFocused: 12,
            }}
            labelStyles={{
              backgroundColor: '#fff',
              paddingHorizontal: 5,

            }}
            inputStyles={{
              color: 'black',
              paddingHorizontal: 10,
            }}
            onChangeText={value => {
              setname(value);
            }}
          />

          <TouchableOpacity style={{ position: "absolute", right: 20, top: 25 }}>
            <Image source={editicon} style={{ width: 20, height: 20 }}></Image>
          </TouchableOpacity>


        </View>

        <View style={styles.inputs}>
          <FloatingLabelInput
            label="Store Name"
            value={storename}
            staticLabel
            hintTextColor={'#aaa'}
            keyboardType="default"
            hint="Enter your store name"
            containerStyles={{
              borderWidth: 2,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              borderColor: 'black',
              borderRadius: 8,
            }}
            customLabelStyles={{
              colorFocused: COLORS.primary,
              fontSizeFocused: 12,
            }}
            labelStyles={{
              backgroundColor: '#fff',
              paddingHorizontal: 5,
            }}
            inputStyles={{
              color: 'black',
              paddingHorizontal: 10,
            }}
            onChangeText={value => {
              setstorename(value);
            }}
          />

          <TouchableOpacity style={{ position: "absolute", right: 20, top: 25 }}>
            <Image source={editicon} style={{ width: 20, height: 20 }}></Image>
          </TouchableOpacity>

        </View>

        <View style={styles.inputs}>
          <FloatingLabelInput
            label="Phone"
            value={phone}
            staticLabel
            hintTextColor={'#aaa'}
            keyboardType="numeric"
            mask="999-999-9999"
            hint="Enter your phone number"
            containerStyles={{
              borderWidth: 2,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              borderColor: 'black',
              borderRadius: 8,
            }}
            customLabelStyles={{
              colorFocused: COLORS.primary,
              fontSizeFocused: 12,
            }}
            labelStyles={{
              backgroundColor: '#fff',
              paddingHorizontal: 5,
            }}
            inputStyles={{
              color: 'black',
              paddingHorizontal: 10,
            }}
            onChangeText={value => {
              setPhone(value);
            }}
          />

          <TouchableOpacity style={{ position: "absolute", right: 20, top: 25 }}>
            <Image source={editicon} style={{ width: 20, height: 20 }}></Image>
          </TouchableOpacity>

        </View>
      <View style={styles.dropdownview}>
        {renderLabelone()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={businessdata}
          search
          maxHeight={320}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Business Type' : '...'}
          searchPlaceholder="Search..."
          value={selectedbusiness}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setselectedbusiness(item.value);
            setIsFocus(false);
          }}/>
        </View>

        <View style={styles.dropdownview}>
        {renderLabeltwo()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={statedata}
          search
          maxHeight={320}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select State' : '...'}
          searchPlaceholder="Search..."
          value={selectedstate}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={handlestatechange}/>
        </View>

        <View style={styles.dropdownview}>
        {renderLabelthree()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={citydata}
          search
          maxHeight={320}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select City' : '...'}
          searchPlaceholder="Search..."
          value={selectedcity}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setselectedcity(item.value);
            setIsFocus(false);
          }}/>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default Profile;

const styles = StyleSheet.create({

  main: {

    alignItems: "center",
    flex: 1,
    margin: 18,

  },

  inputs: {
    padding: 10,
    width: 350,
    position: "relative"
  },

  dropdownview: {
    padding: 10,
    width: 350,
    position: "relative",
    

  },

  profileicon: {

    position: "relative"

  },

  inputfield: {


    border: 1,
    marginTop: 20,
    width: 350,

  },

  profileImage:{

    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2, 
    borderColor: '#fff',
    
  },

  camerastyle: {

    border: 1,
    borderRadius: 30,
    width: 50,
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    position: "absolute",
    top: 100,
    right: 10

  },

  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },

  placeholderStyle: {
    fontSize: 14,
    marginLeft:10
  },
  selectedTextStyle: {
    fontSize: 14,
    paddingLeft:10,
    fontWeight:"bold"
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

});
