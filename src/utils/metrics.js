import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const metrics = {
  screenWidth: width,
  screenHeight: height,
  
  // Spacing
  tiny: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 48,
  
  // Border radius
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
    round: 100,
  },
  
  // Button heights
  buttonHeight: {
    small: 44,
    medium: 52,
    large: 60,
  },
  
  // Icon sizes
  iconSize: {
    tiny: 16,
    small: 20,
    medium: 24,
    large: 32,
    xlarge: 48,
  },
};