import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import clientApi from '../../../services/api/clientApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearError} from './authSlice';

export const addClient = createAsyncThunk(
  'clients/addClient',
  async ({clientName, phoneNumber, email}, {rejectWithValue, getState}) => {
    try {
      const {auth} = getState();
      const token = await AsyncStorage.getItem('userToken');
      const response = await clientApi.addClient({
        token,
        userId: auth.user.id,
        fullName: clientName,
        phoneNumber,
        email,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async (_, {rejectWithValue, getState}) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await clientApi.getClients(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const clientSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearClientError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addClient.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clients.push(action.payload.client);
      })
      .addCase(addClient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchClients.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clients = action.payload.clients;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {clearClientError} = clientSlice.actions;
export default clientSlice.reducer;
