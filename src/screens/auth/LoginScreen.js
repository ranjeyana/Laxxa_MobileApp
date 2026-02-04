import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Responsive scaling functions
const scale = (size) => {
  const guidelineBaseWidth = 375; // iPhone X/11 Pro width
  return (width / guidelineBaseWidth) * size;
};

const moderateScale = (size, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

// Font scaling function (to prevent text from getting too large on tablets)
const fontScale = (size) => {
  const scaleFactor = Math.min(width / 375, 1.2); // Max 20% larger on big screens
  return size * scaleFactor;
};

const LoginScreen = () => {
  const backgroundImage = require('../../../assets/images/loginScreen_bg.png');
  const logoImage = require('../../../assets/images/Laxxa.png');
  const googleLogo = require('../../../assets/logo/google_logo.png');

  const handlePhoneLogin = () => {
    Alert.alert('Phone Login', 'Phone login would open here');
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Google login would open here');
  };

  const handleEmailLogin = () => {
    Alert.alert('Email Login', 'Email login would open here');
  };

  const handleTerms = () => {
    Alert.alert('Terms & Privacy Links', 'Terms & Privacy Links');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topArea}>
          <View style={styles.logoContainer}>
            <Image 
              source={logoImage} 
              style={[
                styles.logo, 
                { 
                  width: moderateScale(140), 
                  height: moderateScale(140) 
                }
              ]} 
              resizeMode="contain" 
            />
          </View>
        </View>

        <View style={styles.bottomArea}>
          {/* Buttons Container */}
          <View style={styles.buttonsContainer}>
            {/* Phone Button */}
            <TouchableOpacity 
              style={[styles.button, styles.phoneButton]} 
              onPress={handlePhoneLogin}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <SimpleLineIcons 
                  name="phone" 
                  size={moderateScale(20)} 
                  color="black" 
                  style={styles.buttonIcon} 
                />
                <Text style={[styles.buttonText, styles.phoneButtonText]}>
                  Continue With Phone Number
                </Text>
              </View>
            </TouchableOpacity>

            {/* Google Button */}
            <TouchableOpacity 
              style={[styles.button, styles.googleButton]} 
              onPress={handleGoogleLogin}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <Image 
                  source={googleLogo} 
                  style={[
                    styles.googleLogoImage, 
                    { 
                      width: moderateScale(20), 
                      height: moderateScale(20) 
                    }
                  ]} 
                  resizeMode="contain" 
                />
                <Text style={[styles.buttonText, styles.googleButtonText]}>
                  Continue With Google
                </Text>
              </View>
            </TouchableOpacity>

            {/* Email Button */}
            <TouchableOpacity 
              style={[styles.button, styles.emailButton]} 
              onPress={handleEmailLogin}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <MaterialCommunityIcons 
                  name="email-outline" 
                  size={moderateScale(22)} 
                  color="white" 
                  style={styles.buttonIcon} 
                />
                <Text style={[styles.buttonText, styles.emailButtonText]}>
                  Continue With Email
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Terms & Conditions */}
          <TouchableOpacity 
            style={styles.termsContainer} 
            onPress={handleTerms}
            activeOpacity={0.7}
          >
            <Text style={styles.termsText}>
              Terms & Privacy Links
            </Text>
          </TouchableOpacity>

          <View style={styles.bottomSpacing} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  topArea: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: moderateScale(20),
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    // Size set dynamically above
  },
  bottomArea: {
    paddingHorizontal: moderateScale(24),
    paddingBottom: moderateScale(40),
  },
  buttonsContainer: {
    marginBottom: moderateScale(30),
  },
  button: {
    width: '100%',
    paddingVertical: moderateScale(14), 
    borderRadius: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(16),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(12),
  },
  googleLogoImage: {
    // Size set dynamically above
  },
  phoneButton: {
    backgroundColor: '#FFECB2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(3) },
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(4),
    elevation: 5,
  },
  phoneButtonText: {
    color: '#333333',
    fontFamily: 'Monrope-Medium',
    letterSpacing: 0.5,
    fontSize: moderateScale(14), 
  },
  googleButton: {
    backgroundColor: '#202020',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(3) },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(4),
    elevation: 5,
  },
  googleButtonText: {
    color: 'white',
    fontFamily: 'Monrope-Medium',
    letterSpacing: 0.5,
    fontSize: moderateScale(14),
  },
  emailButton: {
    backgroundColor: 'transparent',
    borderWidth: moderateScale(2),
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(3),
    elevation: 3,
  },
  emailButtonText: {
    color: 'white',
    fontFamily: 'Monrope-Medium',
    letterSpacing: 0.5,
    fontSize: moderateScale(14),
  },
  buttonText: {
    fontFamily: 'Monrope-Medium',
  },
  termsContainer: {
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  termsText: {
    fontSize: moderateScale(12),
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: moderateScale(20),
    fontFamily: 'Monrope-Regular',
    textDecorationLine: 'underline',
  },
  bottomSpacing: {
    height: moderateScale(0),
  },
});

export default LoginScreen;