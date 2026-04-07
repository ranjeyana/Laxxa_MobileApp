import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleLineIcons } from '@expo/vector-icons';

const EmailLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const logoImage = require('../../../assets/images/Laxxa - Black.png');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

    const handleEmailChange = (text) => {
    setEmail(text);
    setIsValid(isValidEmail(text));
    };



  const handleContinue = () => {
    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }


    Alert.alert('Success', 'Login successful! (This is a UI demo)');
    // In real app: navigation.navigate('Home');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleTerms = () => {
    Alert.alert('Terms & Privacy', 'Terms & Privacy policy page would open here');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Navigate to forgot password screen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleBack}
        activeOpacity={0.7}
      >
        <SimpleLineIcons name="arrow-left" size={20} color="#333" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image 
          source={logoImage} 
          style={styles.logo} 
          resizeMode="contain" 
        />
      </View>

      <View style={styles.centerContent}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              placeholderTextColor="#999"
            />
          </View>
        </View>


        <TouchableOpacity
          style={[
            styles.continueButton,
            isValid ? styles.continueButtonActive : styles.continueButtonInactive
          ]}
          onPress={handleContinue}
          disabled={!isValid}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        onPress={handleTerms}
        activeOpacity={0.7}
        style={styles.termsContainer}
      >
        <Text style={styles.termsText}>
          Terms & Privacy
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    padding: 8,
    zIndex: 10,
  },
  logoContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  logo: {
    width: 120,
    height: 120,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Monrope-Medium',
    color: '#333',
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Monrope-Medium',
    color: '#333',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Monrope-Medium',
    color: '#333',
  },
  showPasswordButton: {
    paddingLeft: 12,
  },
  showPasswordText: {
    fontSize: 14,
    fontFamily: 'Monrope-Medium',
    color: '#333',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Monrope-Medium',
    color: '#333',
    textDecorationLine: 'underline',
  },
  continueButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  continueButtonActive: {
    backgroundColor: '#FFECB2',
  },
  continueButtonInactive: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'Monrope-Medium',
    color: '#000000',
  },
  termsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    fontFamily: 'Monrope-Regular',
    color: '#666',
    textAlign: 'center',
    textDecorationLine: 'underline',
    paddingVertical: 10,
  },
});

export default EmailLoginScreen;