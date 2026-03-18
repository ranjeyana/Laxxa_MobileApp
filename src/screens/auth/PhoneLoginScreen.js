import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleLineIcons } from '@expo/vector-icons';

const PhoneLoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const logoImage = require('../../../assets/images/Laxxa - Black.png');

  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, '');
    
    let formatted = '';
    if (cleaned.length > 0) {
      formatted = cleaned.substring(0, 3);
    }
    if (cleaned.length > 3) {
      formatted += ' ' + cleaned.substring(3, 6);
    }
    if (cleaned.length > 6) {
      formatted += ' ' + cleaned.substring(6, 10);
    }
    
    setPhoneNumber(formatted);
    setIsValid(cleaned.length === 10);
  };

  const handleContinue = () => {
    if (!isValid) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number');
      return;
    }

    // Simply navigate to Home screen
    navigation.replace('Home');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleTerms = () => {
    Alert.alert('Terms & Privacy', 'Terms & Privacy policy page would open here');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={handleBack}
        activeOpacity={0.7}
      >
        <SimpleLineIcons name="arrow-left" size={20} color="#333" />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={logoImage} 
          style={styles.logo} 
          resizeMode="contain" 
        />
      </View>

      {/* Centered content */}
      <View style={styles.centerContent}>
        {/* Input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter Phone Number</Text>
          <View style={styles.phoneInputWrapper}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChangeText={formatPhoneNumber}
              keyboardType="phone-pad"
              maxLength={12}
              autoFocus
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Continue Button */}
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

      {/* Terms & Privacy */}
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
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Monrope-Medium',
    color: '#333',
    marginBottom: 12,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Monrope-Medium',
    color: '#333',
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

export default PhoneLoginScreen;