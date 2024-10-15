import React from 'react';
import { View, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import Loader from './src/components/Modals/Loader';
import Navigations from './src/navigations';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Navigations />
      <Loader />
      <Toast />
    </View>
  );
};

export default App;
