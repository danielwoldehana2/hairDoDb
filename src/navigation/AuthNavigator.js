import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen/SignUpScreen';
import {ROUTES} from '../constants/routes';

const AuthStack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="Hairdo">
      <AuthStack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <AuthStack.Screen name={ROUTES.SIGNUP} component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}
