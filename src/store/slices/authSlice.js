import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authApi from '../../../services/api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({email, password}, {rejectWithValue}) => {
    console.log('email =>', email);
    try {
      const response = await authApi.login(email, password);
      // Store token
      await AsyncStorage.setItem('userToken', response.token);
      console.log('response =>', response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (token, {rejectWithValue}) => {
    try {
      // Remove .data since validateToken already returns the response data
      const response = await authApi.validateToken(token);
      console.log('Restore session response:', response); // Add this log
      return response; // Don't use response.data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({email, password, firstName, lastName}, {rejectWithValue}) => {
    try {
      const response = await authApi.register({
        email,
        password,
        firstName,
        lastName,
      });
      await AsyncStorage.setItem('userToken', response.token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await authApi.logout(token);
      await AsyncStorage.removeItem('userToken');
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      // Login cases
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register cases
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Session restoration cases
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(restoreSession.rejected, state => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Logout cases
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {logout, clearError} = authSlice.actions;
export default authSlice.reducer;
