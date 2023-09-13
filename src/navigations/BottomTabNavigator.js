import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Image} from 'react-native';
import {COLORS, IMGS, ROUTES} from '../constants';
import { Loyalty, Transaction} from '../screens';
import SettingsNavigator from './SettingsNavigator';
import OrderNavigator from './OrderNavigator';
import CustomTabBarButton from '../components/CustomTabBarButton';
import CustomTabBar from '../components/CustomTabBar';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  console.log("BottomTba", Tab);
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: COLORS.dark,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: COLORS.primary,
        tabBarIcon: ({color, size, focused}) => {
          let iconName;

          if (route.name === ROUTES.ORDER_TAB) {
            iconName = IMGS.order;
            //iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
          } else if (route.name === ROUTES.SETTINGS_NAVIGATOR) {
            iconName = IMGS.setting;
          } else if (route.name === ROUTES.LOYALTY) {
            iconName = IMGS.loyalty;
          } else if (route.name === ROUTES.TRANSACTION) {
            iconName = IMGS.transaction;
          }
          return <Image source={iconName} style={styles.icon} />
          //return <Icon name={iconName} size={22} color={color} />;
        },
      })}>
      <Tab.Screen
        name={ROUTES.ORDER_TAB}
        component={OrderNavigator}
        // children={()=><OrderNavigator propName={propValue}/>}
        options={{
          tabBarLabel: 'Order',
          title: 'Order',
          headerShown: true,
          headerTintColor: COLORS.white,
          headerBackTitleVisible: true,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          tabBarButton: props => (
            <CustomTabBarButton route="order" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.LOYALTY}
        component={Loyalty}
        options={{
          tabBarLabel: 'Loyalty',
          title: 'Loyalty',
          headerShown: true,
          headerTintColor: COLORS.white,
          headerBackTitleVisible: true,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          tabBarButton: props => (
            <CustomTabBarButton route="Loyalty" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.TRANSACTION}
        component={Transaction}
        options={{
          tabBarLabel: 'Transaction',
          title: 'Transaction',
          headerShown: true,
          headerTintColor: COLORS.white,
          headerBackTitleVisible: true,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          tabBarButton: props => (
            <CustomTabBarButton route="Transaction" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS_NAVIGATOR}
        component={SettingsNavigator}
        options={{
          tabBarLabel: 'Settings',
          title: 'Settings',
          headerShown: true,
          headerTintColor: COLORS.white,
          headerBackTitleVisible: true,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          tabBarButton: props => (
            <CustomTabBarButton route="settings" {...props} />
          ),
          // headerRight: () => {
          //   return (
          //     <TouchableOpacity onPress={() => navigation.openDrawer()}>
          //       <Icon
          //         name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
          //         size={30}
          //         color={COLORS.dark}
          //         style={{marginRight: 10}}
          //       />
          //     </TouchableOpacity>
          //   );
          // },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: COLORS.black,
    bottom: 0,
    height: 60,
  },
  icon:{
    width:40,
    height:40,
  }
});
