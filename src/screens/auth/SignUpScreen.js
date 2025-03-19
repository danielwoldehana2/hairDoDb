import {View, Text, StyleSheet, Button} from 'react-native';
import {ROUTES} from '../../constants/routes';

export default function SignUpScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up Screen</Text>
      <Button
        title="Login Instead"
        onPress={() => navigation.navigate(ROUTES.LOGIN)}
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
