// cartSlice.js: Redux Toolkit slice responsible for managing the state of the shopping cart, including adding, removing, and updating item quantities.
// It interfaces with the protected backend API to synchronize state using JSON Web Tokens.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks seamlessly integrate API calls into the Redux lifecycle.
// By utilizing getState(), the thunk extracts the JWT from the auth slice to construct the Bearer header.

export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async (product, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    if (!token) return rejectWithValue('Authentication required');

    try {
      const response = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        // The backend expects the raw database _id string which we mapped to 'id' in the frontend.
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      });

      if (!response.ok) throw new Error('Failed to sync with server');
      
      // We return the original product object so the local reducer has all the rich metadata 
      // (title, price, thumbnail) needed for the UI, as the backend only stores the reference ID.
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuantityThunk = createAsyncThunk(
  'cart/updateQuantity',
  async ({ id, quantity }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    if (!token) return rejectWithValue('Authentication required');

    try {
      const response = await fetch(`http://localhost:5000/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      });

      if (!response.ok) throw new Error('Failed to sync with server');
      return { id, quantity };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCartThunk = createAsyncThunk(
  'cart/removeFromCart',
  async (id, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    if (!token) return rejectWithValue('Authentication required');

    try {
      const response = await fetch(`http://localhost:5000/cart/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to sync with server');
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: 'idle',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        const product = action.payload;
        const existingItem = state.items.find(item => item.id === product.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...product, quantity: 1 });
        }
      })
      .addCase(updateQuantityThunk.fulfilled, (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.items.find(i => i.id === id);
        
        // This mutation must be explicitly guarded. Immer uses Proxies under the hood,
        // and attempting to assign properties to undefined objects will throw a TypeError.
        if (item && quantity >= 1) {
          item.quantity = quantity;
        }
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export const { clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalItems = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default cartSlice.reducer;
