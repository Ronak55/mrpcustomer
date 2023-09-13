import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants';

const CustomTabBarButton = props => {
  const {route, children, accessibilityState, onPress} = props;

  if (accessibilityState.selected) {
    return (
      <View style={styles.btnWrapper}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={styles.svgGapFiller}
          />
          <View
            style={styles.svgGapFiller}
          />
        </View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={[styles.activeBtn]}>
          <Text>{children}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={styles.inactiveBtn}>
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  }
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
    width: '25%',
    backgroundColor: COLORS.lightBlack,
  },
  activeBtn: {
    flex: 1,
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  inactiveBtn: {
    flex: 1,
    //backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgGapFiller: {
    flex: 1,
    //backgroundColor: COLORS.transparent,
  },
});
