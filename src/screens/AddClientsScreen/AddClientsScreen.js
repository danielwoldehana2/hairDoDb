import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addClient} from '../../store/slices/clientSlice';
import {ROUTES} from '../../constants/routes';
import styles from './styles';
import FullLoadingScreen from '../../components/FullLoadingScreen';

export default function AddClientsScreen({navigation}) {
  const dispatch = useDispatch();
  const {isLoading, error} = useSelector(state => state.clients);

  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [clientNameError, setClientNameError] = useState('');

  const validateForm = () => {
    let isValid = true;
    if (!clientName.trim()) {
      setClientNameError('Please Enter a Client Name');
      isValid = false;
    } else {
      setClientNameError('');
    }
    return isValid;
  };

  const handleSaveClient = async () => {
    if (validateForm()) {
      try {
        await dispatch(
          addClient({
            clientName,
            phoneNumber,
            email,
          }),
        ).unwrap();
        navigation.navigate(ROUTES.CLIENTS);
      } catch (error) {
        console.error('Failed to add client:', error);
      }
    }
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <View style={styles.form}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.formInput}
                placeholder="Client Name *"
                value={clientName}
                onChangeText={setClientName}
              />
              {clientNameError && (
                <Text style={styles.errorText}>{clientNameError}</Text>
              )}
              <TextInput
                style={styles.formInput}
                placeholder="Phone Number (Optional)"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.formInput}
                placeholder="Email (Optional)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSaveClient}>
                <Text style={styles.buttonText}>Save Client</Text>
              </TouchableOpacity>
            </View>
          </View>
          {isLoading && <FullLoadingScreen visible={isLoading} />}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
