import { expect, test } from '@jest/globals';
import {
    userOrdersReducer,
  initialState,
  TOrders,
  apiGetOrder
} from '../slices/ordersSlice';
import { TOrder } from '../../utils/types';

const mockPlacedOrders: TOrder[] = [
  {
    _id: '66ed6ad7119d45001b507edb',
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2024-10-27T12:29:48.229Z',
    updatedAt: '2024-10-27T12:29:48.709Z',
    number: 53442,
    ingredients: ['643d69a5c3f7b9001cfa093c']
  },
  {
    _id: '66ed7358119d45001b507ef4',
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-10-27T13:06:32.642Z',
    updatedAt: '2024-10-27T13:06:33.485Z',
    number: 53445,
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e']
  }
];

describe('проверим  userOrdersReducer', () => {
  test('проверим apiGetOrder.pending', () => {
    const action = {
      type: apiGetOrder.pending.type
    };
    const testState = userOrdersReducer(initialState, action);
    const checkState = { ...initialState};

    expect(testState).toEqual(checkState);
  });

  test('проверим apiGetOrder.fulfilled', () => {
    const action = {
      type: apiGetOrder.fulfilled.type,
      payload: mockPlacedOrders
    };
    const testState = userOrdersReducer(initialState, action);
    const checkState = {
      ...initialState,
      orders: mockPlacedOrders
    };

    expect(testState).toEqual(checkState);
  });

  test('проверим apiGetOrder.rejected', () => {
    const action = {
      type: apiGetOrder.rejected.type
    };
    const testState = userOrdersReducer(initialState, action);
    const checkState = {
      ...initialState
    };

    expect(testState).toEqual(checkState);
  });
});
