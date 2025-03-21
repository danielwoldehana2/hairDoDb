import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 6,
  },
  logoutButton: {
    marginRight: 15,
  },
  logoutText: {
    color: '#007AFF', // iOS blue color
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    justifyContent: 'space-between',
  },
  searchInput: {
    borderWidth: 0.8,
    borderColor: 'rgb(102, 101, 101)',
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 5,
    paddingHorizontal: 10,
  },

  clientList: {
    flex: 1,
    width: '100%',
  },
  clientCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    // marginHorizontal: 16,
    borderBottomWidth: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    // width: '100%',
    height: 40,
    padding: 10,
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
  clientName: {
    fontSize: 15,
  },
  noClientsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
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
  footer: {
    marginVertical: 22,
  },
});

export default styles;
