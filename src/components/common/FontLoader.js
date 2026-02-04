import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Font from 'expo-font';

const FontLoader = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Monrope-Regular': require('../../../assets/fonts/Manrope-Regular.ttf'),
        'Monrope-Medium': require('../../../assets/fonts/Manrope-Medium.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Or a loading screen
  }

  return children;
};

export default FontLoader;