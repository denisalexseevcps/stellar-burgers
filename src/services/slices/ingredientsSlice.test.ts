import { configureStore } from '@reduxjs/toolkit';
import {
  ingredientsReducer,
  apiGetIngredients,
  initialState,
  ingredientDone,
  ingredientsState,
  TIngredientsState,
  ingredientsArr
} from './ingredientsSlice';

const mockIngridients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  }
];

const mockState: { ingredients: TIngredientsState } = {
  ingredients: {
    ingredients: mockIngridients,
    loading: false,
    error: null
  }
};

describe('тест асинхронных экшенов', () => {
  describe('тест запросов', () => {
    it('тест apiGetIngredients.pending', () => {
      const action = {
        type: apiGetIngredients.pending.type,
        payload: null
      };

      const newSate = ingredientsReducer(initialState, action);
      expect(newSate).toEqual({
        ingredients: [],
        loading: true,
        error: null
      });
    });

    it('тест apiGetIngredients.rejected', () => {
      const action = {
        type: apiGetIngredients.rejected.type,
        error: { message: 'test' }
      };

      const newState = ingredientsReducer(initialState, action);
      expect(newState).toEqual({
        ingredients: [],        
        loading: true,
        error: 'test'
      });
    });

    it('тест getIngredients.fulfilled', () => {
      const action = {
        type: apiGetIngredients.fulfilled.type,
        payload: ['test']
      };

      const newState = ingredientsReducer(
        {
          ingredients: [],
          loading: false,
          error: null
        },
        action
      );
      expect(newState).toEqual({
        ingredients: ['test'],
        loading: false,
        error: null
      });
    });
  });
});

describe('тесты селекторов', () => {
  it('Получение списка ингредиетов', () => {
    const ingredients = ingredientsArr(mockState);
    expect(ingredients).toEqual(mockIngridients);
  });

  it('Получение состояния загрузки', () => {
    const loading = ingredientDone(mockState);
    expect(loading).toBe(false);
  });
});
