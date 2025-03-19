import {View, Text, StyleSheet, Button} from 'react-native';
import {ROUTES} from '../../constants/routes';

export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate(ROUTES.HOME)}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate(ROUTES.SIGNUP)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
