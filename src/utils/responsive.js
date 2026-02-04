import { Dimensions, Platform, PixelRatio } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

// Screen dimensions
const { width, height } = Dimensions.get('window');

// Guideline sizes are based on iPhone 11 (414x896)
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

// Responsive scale function
const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

// Platform detection
const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

// Screen size categories
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 414;
const isLargeDevice = width >= 414;

// Font scaling prevention
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

export {
  width,
  height,
  wp,
  hp,
  loc,
  rol,
  scale,
  verticalScale,
  moderateScale,
  isIOS,
  isAndroid,
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  getFontSize,
};