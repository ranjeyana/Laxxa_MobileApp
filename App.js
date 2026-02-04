import { StyleSheet, Text, View } from 'react-native';
import FontLoader from './src/components/common/FontLoader';
import LoginScreen from './src/screens/auth/LoginScreen';

export default function App() {
  return (
   <FontLoader>
    <LoginScreen/>
   </FontLoader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
