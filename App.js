import React from 'react';
import {View} from 'react-native';
import {Home} from './src/screens';
import SwitchButton from './src/components/SwitchButton';
import Carousel from './src/components/Carousel';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Home />
      <SwitchButton />
      <View style={{flex: 1, justifyContent: 'center'}}>
        {/* This View will take up remaining vertical space and center Carousel */}
        <Carousel />
      </View>
      <View style={{marginBottom: 10}}></View>
    </View>
  );
};

export default App;
