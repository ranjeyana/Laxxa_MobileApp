import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { View } from 'react-native';

import LoginScreen from './src/screens/auth/LoginScreen';
import PhoneLoginScreen from './src/screens/auth/PhoneLoginScreen';
import EmailLoginScreen from './src/screens/auth/EmailLoginScreen';
import HomeScreen from './src/screens/main/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Monrope-Regular': require('./assets/fonts/Manrope-Regular.ttf'),
        'Monrope-Medium': require('./assets/fonts/Manrope-Medium.ttf'),
      });
      setFontsLoaded(true);
    }
    
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#000' }} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />
        <Stack.Screen 
          name="PhoneLogin" 
          component={PhoneLoginScreen} 
        />
         <Stack.Screen 
          name="EmailLogin" 
          component={EmailLoginScreen} 
        />
        {/* <Stack.Screen 
          name="OTPVerification" 
          component={OTPVerificationScreen} 
        /> */}
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}