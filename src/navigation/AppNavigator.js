import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClientScreen from '../screens/ClientsScreen/ClientsScreen';
import AddClientsScreen from '../screens/AddClientsScreen/AddClientsScreen';
import {AuthNavigator} from './AuthNavigator';
import {ROUTES} from '../constants/routes';
import {API_URL} from '@env';
import FullLoadingScreen from '../components/FullLoadingScreen';
import {restoreSession} from '../store/slices/authSlice';
import {fetchClients} from '../store/slices/clientSlice';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Stored token:', token); // Check if token exists

      if (token) {
        // Verify token is valid with backend
        const response = await axios.get(`${API_URL}/api/auth/check-session`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Check session response:', response.data); // See what we get back

        if (response.data.message === 'Session is valid') {
          await dispatch(restoreSession(token)).unwrap();
          await dispatch(fetchClients()).unwrap();
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.log('Token validation failed:', error);
      await AsyncStorage.removeItem('userToken');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <FullLoadingScreen visible={true} />;
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? ROUTES.CLIENTS : ROUTES.AUTH}>
      <Stack.Screen
        name={ROUTES.AUTH}
        component={AuthNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name={ROUTES.CLIENTS} component={ClientScreen} />
      <Stack.Screen name={ROUTES.ADD_CLIENT} component={AddClientsScreen} />
    </Stack.Navigator>
  );
}
