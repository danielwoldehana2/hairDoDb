import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../store/slices/authSlice';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../constants/routes';
import styles from './styles';

export default function ClientScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userInfo = useSelector(state => state.auth.user);
  const {clients} = useSelector(state => state.clients);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigation.replace(ROUTES.AUTH);
    } catch (error) {
      console.error('Logout error:', error);
      // Still navigate to auth screen even if logout fails
      navigation.replace(ROUTES.AUTH);
    }
  };

  // Add this useEffect to set up the header button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  console.log('clientInfo =>', JSON.stringify(clients, 0, 2));
  const renderClients = () => {
    return clients.map(client => (
      <TouchableOpacity
        key={client.id}
        style={styles.clientCard}
        onPress={() => {}}>
        <View style={styles.cardItems}>
          <Text style={styles.clientName}>{client.full_name}</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
            <Text style={{color: 'white'}}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome {userInfo.first_name}</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.searchInput} placeholder="Search Clients..." />
      </View>
      <ScrollView style={styles.clientsList}>
        {clients.length > 0 ? (
          renderClients()
        ) : (
          <Text style={styles.noClientsText}>No Clients Found</Text>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(ROUTES.ADD_CLIENT)}>
        <Text style={styles.buttonText}>Add New Client</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={{color: 'red', alignSelf: 'center'}}>
            Delete Account
          </Text>
        </TouchableOpacity>
        <Text style={{alignSelf: 'center', fontSize: 10}}>
          Your plan renews on 2029-01-15
        </Text>
        <TouchableOpacity>
          <Text style={{color: 'purple', alignSelf: 'center', fontSize: 11}}>
            Manage Subscription
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
