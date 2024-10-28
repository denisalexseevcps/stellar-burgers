import { error } from 'console';
import {
  newOrderReducer,
  clearOrder,
  apiOrderBurger,
  initialState,
  getDataORder
} from './createOrderSlice';

describe('тест асинхронных экшенов', () => {
  describe('запрос всех заказо', () => {
    it('тест apiOrderBurger.fulfilled', () => {
      const action = {
        type: apiOrderBurger.fulfilled.type,
        payload: {
          order: {
            _id: 'string',
            status: 'string',
            name: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            number: 'number',
            ingredients: ['test']
          }
        }
      };

      const newState = newOrderReducer(initialState, action);
      expect(newState).toEqual({
        orderRequest: false,
        orderModalData: {
          _id: 'string',
          status: 'string',
          name: 'string',
          createdAt: 'string',
          updatedAt: 'string',
          number: 'number',
          ingredients: ['test']
        },
        error: undefined
      });
    });

    it('тест apiOrderBurger.rejected', () => {
      const action = {
        type: apiOrderBurger.rejected.type,
        error: { message: 'test' }
      };
      const newState = newOrderReducer(initialState, action);
      expect(newState).toEqual({
        orderRequest: false,
        orderModalData: null,
        error: 'test'
      });
    });

    it('тест apiOrderBurger.pending', () => {
      const action = {
        type: apiOrderBurger.pending.type
      };

      const newState = newOrderReducer(initialState, action);
      expect(newState.orderRequest).toBe(true);
    });
  });
});
