import React, { useEffect , useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, ROUTES} from '../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';


function Register({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState(null);
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  const data = [
    {label: 'Retail', value: 'RETAIL'},
    {label: 'Grocery', value: 'GROCERY'},
    {label: 'Stationery', value: 'STATIONERY'},
    {label: 'Fashion', value: 'FASHION'},
    {label: 'Restaurant', value: 'RESTAURANT'},
    {label: 'Spa/Salon', value: 'SALON'},
  ];

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_lOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(()=>{
    
    requestLocationPermission();
        
  }, [])

  const [mapRegion, setMapRegion] = useState({
    latitude: 26.92207,
    longitude: 75.778885,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setMapRegion({
          ...mapRegion,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  

  // const userLocation = async () => {
  //   let {status} = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     setErrorMsg('Permission to access location was denied');
  //   }
  //    let location = await Location.getCurrentPositionAsync({ });
  //   setMapRegion({
  //     latitude: location.coords.latitude,
  //     longitude: location.coords.longitude,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   });
  //   console.log(location.coords.latitude, location.coords.longitude);
  // };

  const createVendor = () => {
    let requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "phone_number": phoneNumber,
        "business_name": orgName,
        "business_type": orgType,
        "city": city.toUpperCase(),
        "password": password,
        "zip_code" : zipCode,
        "location" : [Location.coords.latitude, Location.coords.longitude]
      }),
      redirect: 'follow'
    };

    fetch("http://13.200.100.28:5000/api/createSeller", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.sellerId){
       dispatch(addVendorDetail(result));
       navigation.navigate(ROUTES.LOGIN);
      }
    })
    .catch(error => {
      console.log('error', error);
    });
  }


  // React.useEffect(() => {
  //   userLocation();
  // }, []);

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
            onChangeText={e => setPhoneNumber(e)}
            textContentType="username"
            value={phoneNumber}
            placeholderTextColor={COLORS.gray}
          />
          <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Password"
            inputMode="text"
            maxLength={14}
            onChangeText={e => setPassword(e)}
            textContentType="password"
            value={password}
            placeholderTextColor={COLORS.gray}
          />
          <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Bussiness Name"
            inputMode="text"
            maxLength={40}
            onChangeText={e => setOrgName(e)}
            textContentType="organizationName"
            value={orgName}
            placeholderTextColor={COLORS.gray}
          />
          <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="City"
            inputMode="text"
            maxLength={20}
            onChangeText={e => setCity(e)}
            textContentType="organizationName"
            value={city}
            placeholderTextColor={COLORS.gray}
          />
          <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Pin Code"
            inputMode="numeric"
            maxLength={6}
            onChangeText={e => setZipCode(e)}
            textContentType="organizationName"
            value={zipCode}
            placeholderTextColor={COLORS.gray}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Bussiness Type"
            searchPlaceholder="Search..."
            value={orgType}
            onChange={item => {
              setOrgType(item.value);
            }}
          />
          <View style={styles.mapContainer}>
            <MapView style={styles.mapView} region={mapRegion}>
              <Marker coordinate={mapRegion} title="Marker" />
              <View style={styles.mapBtnWrapper}>
                <LinearGradient
                  colors={[COLORS.gradientForm, COLORS.primary]}
                  style={styles.linearGradient}
                  start={{y: 0.0, x: 0.0}}
                  end={{y: 1.0, x: 0.0}}>
                  <TouchableOpacity
                    onPress={getLocation}
                    style={styles.mapBtn}
                    activeOpacity={0.7}>
                    <Text style={styles.mapText}>
                      Add Current Location as address
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </MapView>
          </View>

          <View style={styles.loginBtnWrapper}>
            <LinearGradient
              colors={[COLORS.gradientForm, COLORS.primary]}
              style={styles.linearGradient}
              start={{y: 0.0, x: 0.0}}
              end={{y: 1.0, x: 0.0}}>
              {/******************** LOGIN BUTTON *********************/}
              <TouchableOpacity
                onPress={() => createVendor()}
                activeOpacity={0.7}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Register</Text>
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
    backgroundColor: COLORS.bgColor,
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
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    height: 55,
    paddingVertical: 0,
    color: COLORS.white,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
    color: COLORS.white,
  },
  placeholderStyle: {
    color: COLORS.grayLight,
  },
  selectedTextStyle: {
    color: COLORS.grayLight,
  },
  inputSearchStyle: {},

  //map
  mapContainer: {
    height: 150,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    borderRadius: 5,
  },
  mapView: {
    height: 150,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    borderRadius: 5,
  },
  mapBtnWrapper: {
    height: 20,
    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 10,
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBtn: {
    width: '80%',
    height: 20,
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    height: 20,
    alignSelf: 'center',
    textAlign: 'center',
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
  forgotPassText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 16,
  },
  // footer
  footer: {
    position: 'absolute',
    bottom: 20,
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
  forgotPassBtn: {},
});

export default Register;
function setErrorMsg(arg0) {
  throw new Error('Function not implemented.');
}
