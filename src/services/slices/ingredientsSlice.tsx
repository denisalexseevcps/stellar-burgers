import { getIngredientsApi } from '../../utils/burger-api';
import { IngredientDetails } from '@components';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const apiGetIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientDone: (state) => state.loading,
    ingredientsState: (state) => state,
    ingredientsArr: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiGetIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiGetIngredients.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      })
      .addCase(apiGetIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        console.log(state.ingredients);
      });
  }
});

export const { ingredientDone, ingredientsState, ingredientsArr } =
  ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
