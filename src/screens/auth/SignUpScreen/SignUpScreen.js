import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../../store/slices/authSlice';
import {ROUTES} from '../../../constants/routes';
import styles from './styles';
import FullLoadingScreen from '../../../components/FullLoadingScreen';

export default function SignUpScreen({navigation}) {
  const dispatch = useDispatch();
  const {isLoading, error} = useSelector(state => state.auth);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;

    // First Name validation
    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    // Last Name validation
    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must contain an uppercase letter');
      isValid = false;
    } else if (!/\d/.test(password)) {
      setPasswordError('Password must contain a number');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        await dispatch(
          registerUser({
            email,
            password,
            firstName,
            lastName,
          }),
        ).unwrap();
        navigation.replace(ROUTES.CLIENTS);
      } catch (error) {
        console.error('Registration Failed:', error);
      }
    }
  };

  const ErrorMessage = ({message}) =>
    message ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{message}</Text>
      </View>
    ) : null;

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
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
              />
              <ErrorMessage message={firstNameError} />

              <TextInput
                style={styles.formInput}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
              <ErrorMessage message={lastNameError} />

              <TextInput
                style={styles.formInput}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <ErrorMessage message={emailError} />

              <TextInput
                style={styles.formInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <ErrorMessage message={passwordError} />

              <TextInput
                style={styles.formInput}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              <ErrorMessage message={confirmPasswordError} />
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(ROUTES.LOGIN)}>
                <Text style={styles.buttonText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          {isLoading && <FullLoadingScreen visible={isLoading} />}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
