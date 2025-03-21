import axios from 'axios';
import {API_URL} from '@env';

const clientApi = {
  addClient: async ({token, userId, fullName, phoneNumber, email}) => {
    try {
      console.log('payload =>', token, userId, fullName, phoneNumber, email);
      const response = axios.post(
        `${API_URL}/api/clients`,
        {
          userId,
          fullName,
          phoneNumber,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return (await response).data;
    } catch (error) {
      if (!error.response) {
        throw {
          message:
            'Unable to connect to server. Please check your internet connection.',
        };
      }
      throw error.response?.data || {message: 'Failed to add client'};
    }
  },

  getClients: async token => {
    try {
      const response = await axios.get(`${API_URL}/api/clients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw {
          message:
            'Unable to connect to server. Please check your internet connection.',
        };
      }
      throw error.response?.data || {message: 'Failed to fetch clients'};
    }
  },
};

export default clientApi;
