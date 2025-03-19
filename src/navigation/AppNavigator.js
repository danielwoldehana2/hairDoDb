import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import {AuthNavigator} from './AuthNavigator';
import {ROUTES} from '../constants/routes';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName={ROUTES.AUTH}>
      <Stack.Screen
        name={ROUTES.AUTH}
        component={AuthNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
}
