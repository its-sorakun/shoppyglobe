// src/redux/authSlice.js: Manages the authentication state of the application.
// This slice handles JWT storage, retrieval from localStorage to persist sessions,
// and async operations for logging in and registering via the Node.js backend.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Retrieve the initial token from localStorage so the session survives page reloads.
const initialToken = localStorage.getItem('token') || null;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || 'Login failed.');
      }

      // Persist the token locally.
      localStorage.setItem('token', data.token);
      return data.token;
    } catch (error) {
      return rejectWithValue('Network error occurred during login.');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || 'Registration failed.');
      }

      // Automatically login after successful registration by reusing the login thunk,
      // or just direct the user to login. The PDF doesn't explicitly return a token 
      // on register, so it assumes the user will manually log in next.
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred during registration.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
    isAuthenticated: !!initialToken,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    logout: (state) => {
      // Clear local storage and reset state upon logging out.
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
