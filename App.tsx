/**
 * Sample React Native App
 * https://github.com/facebook/react-native
*
* @format
*/

import React, {useEffect} from 'react';
// import SmsListener from '@ernestbies/react-native-android-sms-listener'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import type {PropsWithChildren} from 'react';
import { ToastAndroid } from 'react-native';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Settings from './Settings';
import Home from './Home';


const App = () => {
  // useEffect(()=>{
  //   SmsListener.addListener(message => {
  //       console.log(message);
  //       ToastAndroid.show(JSON.stringify(message),3);
  //   });
  // },[]);
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={({ }) => ({
        drawerStyle: {
          backgroundColor: '#ffffff'
        },
        drawerLabelStyle: {
          color: '#000000',
          fontSize: 20
        },
        // headerShown:false,
        headerStyle: { backgroundColor: 'green',  height: 50 },
        drawerPosition: 'left'
      })}>

        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>

    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
