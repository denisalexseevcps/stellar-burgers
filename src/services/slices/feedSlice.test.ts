import { apiGetFeeds, initialState } from './feedSlice';
import { feedsReducer } from './feedSlice';

describe('тест асинхронных экшенов', () => {
  describe('запрос заказов', () => {
    it('тест getAllFeeds.fulfilled', () => {
      const action = {
        type: apiGetFeeds.fulfilled.type,
        payload: { orders: ['test'], total: 1, totalToday: 1 }
      };

      const newState = feedsReducer(initialState, action);
      expect(newState).toEqual({
        orders: ['test'],
        total: 1,
        totalToday: 1,
        error: null,
        loading: false
      });
    });

    it('тест getAllFeeds.rejected', () => {
      const action = {
        type: apiGetFeeds.rejected.type,
        error: { message: 'test' }
      };

      const newState = feedsReducer(initialState, action);
      expect(newState).toEqual({
        orders: [],
        total: 0,
        totalToday: 0,
        error: 'test',
        loading: false
      });
    });
  });
});
