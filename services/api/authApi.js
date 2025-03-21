import axios from 'axios';
import {API_URL} from '@env';

const authApi = {
  /**
   * Authenticates a user with email and password
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise} Response containing user data and token
   */
  login: async (email, password) => {
    console.log('Attempting login with:', {email, password});
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      console.log('Server response:', response.data);
      return response.data;
    } catch (error) {
      console.log('Error details:', {
        message: error.message,
        response: error.response,
        url: `${API_URL}/api/auth/login`,
      });

      if (!error.response) {
        throw {
          message:
            'Unable to connect to server. Please check your internet connection.',
        };
      }

      switch (error.response.status) {
        case 401:
          throw {message: 'Invalid email or password'};
        case 500:
          throw {message: 'Server error. Please try again later.'};
        default:
          throw (
            error.response?.data || {message: 'An unexpected error occurred'}
          );
      }
    }
  },

  logout: async token => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || {message: 'Logout failed'};
    }
  },

  /**
   * Registers a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.email - User's email
   * @param {string} userData.password - User's password
   * @param {string} userData.firstName - User's first name
   * @param {string} userData.lastName - User's last name
   * @returns {Promise} Response containing user data and token
   */
  register: async ({email, password, firstName, lastName}) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        email,
        password,
        firstName,
        lastName,
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw {
          message:
            'Unable to connect to server. Please check your internet connection.',
        };
      }

      switch (error.response.status) {
        case 400:
          throw {
            message: error.response.data.message || 'Email already registered',
          };
        case 422:
          throw {
            message: error.response.data.message || 'Invalid input data',
          };
        case 500:
          throw {
            message: 'Server error. Please try again later.',
          };
        default:
          throw error.response?.data || {message: 'Registration failed'};
      }
    }
  },

  /**
   * Validates a token
   * @param {string} token - JWT token to validate
   * @returns {Promise} Response containing validation status
   */
  validateToken: async token => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/check-session`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('ValidateToken response:', response.data); // Add this log
      return response.data; // Make sure we're returning the data
    } catch (error) {
      console.error('ValidateToken error:', error);
      throw {
        message: 'Token validation failed',
        isValid: false,
      };
    }
  },
};

export default authApi;
