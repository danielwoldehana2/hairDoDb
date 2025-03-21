import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, clearError} from '../../../store/slices/authSlice';
import {ROUTES} from '../../../constants/routes';
import styles from './styles';
import FullLoadingScreen from '../../../components/FullLoadingScreen';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const {isLoading, error} = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email cannot be empty';
    if (!emailRegex.test(email)) return 'Invalid email format';
    return null; // No error
  };

  const validatePassword = password => {
    if (!password) return 'Password cannot be empty';
    if (password.length < 8)
      return 'Password must be at least 8 characters long';
    if (!/[A-Z]/.test(password))
      return 'Password must contain at least one uppercase letter';
    if (!/\d/.test(password))
      return 'Password must contain at least one number';
    return null; // No error
  };

  const ErrorMessage = ({message}) => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );

  const handleLogin = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setEmailError(emailError);
    setPasswordError(passwordError);

    if (!emailError && !passwordError) {
      try {
        await dispatch(loginUser({email, password})).unwrap();
        navigation.replace(ROUTES.CLIENTS);
      } catch (error) {
        console.error('Login Failed:', error);
      }
    }
  };

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <Text style={styles.text}>Welcome to Hairdo!</Text>
          <View style={styles.form}>
            {error && <ErrorMessage message={error} />}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.formInput}
                placeholder="Email..."
                value={email}
                onChangeText={setEmail}
              />
              {emailError && <Text style={{color: 'red'}}>{emailError}</Text>}
              <TextInput
                style={styles.formInput}
                placeholder="Password..."
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              {passwordError && (
                <Text style={{color: 'red'}}>{passwordError}</Text>
              )}
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(ROUTES.SIGNUP)}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
          {isLoading && <FullLoadingScreen visible={isLoading} />}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
