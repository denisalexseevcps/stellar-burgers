import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const apiOrderBurger = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export interface TNewOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
}

export const initialState: TNewOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearOrder: (state) => (state = initialState)
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getDataORder: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiOrderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(apiOrderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(apiOrderBurger.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const { clearOrder } = newOrderSlice.actions;
export const { getOrderRequest, getDataORder } =
  newOrderSlice.selectors;
export const newOrderReducer = newOrderSlice.reducer;
