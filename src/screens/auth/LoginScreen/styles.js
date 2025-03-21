import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    justifyContent: 'space-between',
  },
  formInput: {
    borderWidth: 0.8,
    borderColor: 'rgb(102, 101, 101)',
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    height: 90,
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
  errorContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

export default styles;
