import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '../../utils/burger-api';

export const apiGetOrder = createAsyncThunk('orders/userOrders', getOrdersApi);

export type TOrders = {
  orders: TOrder[];
};

export const initialState: TOrders = {
  orders: []
};

const userOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersState: (state) => state,
    getUserOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiGetOrder.pending, (state) => {})
      .addCase(apiGetOrder.rejected, (state, action) => {})
      .addCase(apiGetOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

export const { getOrdersState, getUserOrders } = userOrdersSlice.selectors;

export const userOrdersReducer = userOrdersSlice.reducer;
