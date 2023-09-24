import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Image, Text} from 'react-native';
import {COLORS, IMGS, ROUTES} from '../constants';
import {Loyalty, Transaction, Profile} from '../screens';
import SettingsNavigator from './SettingsNavigator';
import OrderNavigator from './OrderNavigator';
import {useNavigation} from '@react-navigation/native';
// import Ionic from 'react-native-vector-icons/Ionicons';
import HomeIcon from '../assets/icons/home.png';
import GroupIcon from '../assets/icons/group.png';
import MedalIcon from '../assets/icons/medal.png';
import UserIcon from '../assets/icons/user.png';
import WalletIcon from '../assets/icons/wallet.png';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();

function BoldText({children, style}) {
  return <Text style={{...style, fontWeight: 'bold'}}>{children}</Text>;
}


function BottomTabNavigator() {

  const navigation = useNavigation();

  return (
    <SafeAreaProvider style = {styles.container}>
        <Tab.Navigator
          initialRouteName={ROUTES.ORDER_TAB}
          screenOptions={({route}) => ({
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: 'black',
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 50,
              position: 'absolute',
              bottom: 0,
            },
          })}>
            
          <Tab.Screen
            name={ROUTES.ORDER_TAB}
            component={OrderNavigator}
            options={{
              tabBarLabel: ({color, focused}) => (
                <BoldText style={{color}}>Home</BoldText>
              ),
              tabBarIcon: ({focused}) => (
                <Image
                  source={HomeIcon}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? COLORS.primary : '#333',
                  }}
                />
              ),

              headerTintColor: COLORS.white,
              headerStyle: {
                backgroundColor: COLORS.primary,
              },
            }}
          />
          <Tab.Screen
            name={ROUTES.WALLET}
            component={Loyalty}
            options={{
              tabBarLabel: ({color, focused}) => (
                <BoldText style={{color}}>Wallet</BoldText>
              ),
              tabBarIcon: ({focused}) => (
                <Image
                  source={WalletIcon}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? COLORS.primary : '#333',
                  }}
                />
              ),

              headerTintColor: COLORS.white,
              headerStyle: {
                backgroundColor: COLORS.primary,
              },
            }}
          />

          <Tab.Screen
            name={ROUTES.TRANSACTION}
            component={Transaction}
            options={{
              tabBarLabel: ({color, focused}) => (
                <BoldText style={{color}}>Transaction</BoldText>
              ),
              tabBarIcon: ({focused}) => (
                <Image
                  source={MedalIcon}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? COLORS.primary : '#333',
                  }}
                />
              ),

              headerTintColor: COLORS.white,
              headerStyle: {
                backgroundColor: COLORS.primary,
              },
            }}
          />

          <Tab.Screen
            name={ROUTES.SETTINGS_NAVIGATOR}
            component={SettingsNavigator}
            options={{
              tabBarLabel: ({color, focused}) => (
                <BoldText style={{color}}>Settings</BoldText>
              ),
              tabBarIcon: ({focused}) => (
                <Image
                  source={GroupIcon}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? COLORS.primary : '#333',
                  }}
                />
              ),

              headerTintColor: COLORS.white,
              headerStyle: {
                backgroundColor: COLORS.primary,
              },
            }}
          />

          <Tab.Screen
            name={ROUTES.PROFILE}
            component={Profile}
            options={{
              tabBarLabel: ({color, focused}) => (
                <BoldText style={{color}}>Profile</BoldText>
              ),
              tabBarIcon: ({focused}) => (
                <Image
                  source={UserIcon}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? COLORS.primary : '#333',
                  }}
                />
              ),

              headerTintColor: COLORS.white,
              headerStyle: {
                backgroundColor: COLORS.primary,
              },
            }}
          />
        </Tab.Navigator>

    </SafeAreaProvider>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
 
  container:{
    flex: 1,
    backgroundColor:'#fff'
  }
});



// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {StyleSheet, Image} from 'react-native';
// import {COLORS, IMGS, ROUTES} from '../constants';
// import { Loyalty, Transaction} from '../screens';
// import SettingsNavigator from './SettingsNavigator';
// import OrderNavigator from './OrderNavigator';
// import CustomTabBarButton from '../components/CustomTabBarButton';
// import CustomTabBar from '../components/CustomTabBar';
// import {useNavigation} from '@react-navigation/native';

// const Tab = createBottomTabNavigator();

// function BottomTabNavigator() {
//   console.log("BottomTba", Tab);
//   const navigation = useNavigation();
//   return (
//     <Tab.Navigator
//       tabBar={props => <CustomTabBar {...props} />}
//       screenOptions={({route}) => ({
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarInactiveTintColor: COLORS.dark,
//         tabBarStyle: styles.tabBarStyle,
//         tabBarActiveTintColor: COLORS.primary,
//         tabBarIcon: ({color, size, focused}) => {
//           let iconName;

//           if (route.name === ROUTES.ORDER_TAB) {
//             iconName = IMGS.order;
//             //iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
//           } else if (route.name === ROUTES.SETTINGS_NAVIGATOR) {
//             iconName = IMGS.setting;
//           } else if (route.name === ROUTES.LOYALTY) {
//             iconName = IMGS.loyalty;
//           } else if (route.name === ROUTES.TRANSACTION) {
//             iconName = IMGS.transaction;
//           }
//           return <Image source={iconName} style={styles.icon} />
//           //return <Icon name={iconName} size={22} color={color} />;
//         },
//       })}>
//       <Tab.Screen
//         name={ROUTES.ORDER_TAB}
//         component={OrderNavigator}
//         // children={()=><OrderNavigator propName={propValue}/>}
//         options={{
//           tabBarLabel: 'Order',
//           title: 'Order',
//           headerShown: true,
//           headerTintColor: COLORS.white,
//           headerBackTitleVisible: true,
//           headerStyle: {
//             backgroundColor: COLORS.primary,
//           },
//           tabBarButton: props => (
//             <CustomTabBarButton route="order" {...props} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name={ROUTES.LOYALTY}
//         component={Loyalty}
//         options={{
//           tabBarLabel: 'Loyalty',
//           title: 'Loyalty',
//           headerShown: true,
//           headerTintColor: COLORS.white,
//           headerBackTitleVisible: true,
//           headerStyle: {
//             backgroundColor: COLORS.primary,
//           },
//           tabBarButton: props => (
//             <CustomTabBarButton route="Loyalty" {...props} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name={ROUTES.TRANSACTION}
//         component={Transaction}
//         options={{
//           tabBarLabel: 'Transaction',
//           title: 'Transaction',
//           headerShown: true,
//           headerTintColor: COLORS.white,
//           headerBackTitleVisible: true,
//           headerStyle: {
//             backgroundColor: COLORS.primary,
//           },
//           tabBarButton: props => (
//             <CustomTabBarButton route="Transaction" {...props} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name={ROUTES.SETTINGS_NAVIGATOR}
//         component={SettingsNavigator}
//         options={{
//           tabBarLabel: 'Settings',
//           title: 'Settings',
//           headerShown: true,
//           headerTintColor: COLORS.white,
//           headerBackTitleVisible: true,
//           headerStyle: {
//             backgroundColor: COLORS.primary,
//           },
//           tabBarButton: props => (
//             <CustomTabBarButton route="settings" {...props} />
//           ),
//           // headerRight: () => {
//           //   return (
//           //     <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           //       <Icon
//           //         name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
//           //         size={30}
//           //         color={COLORS.dark}
//           //         style={{marginRight: 10}}
//           //       />
//           //     </TouchableOpacity>
//           //   );
//           // },
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// export default BottomTabNavigator;