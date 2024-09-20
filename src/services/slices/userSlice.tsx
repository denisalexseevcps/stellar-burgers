import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi,
  TLoginData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

// Создаем асинхронные действия
export const apiGetUser = createAsyncThunk('user/get', async () =>
  getUserApi()
);

export const apiUpdateUser = //createAsyncThunk('user/update', updateUserApi);
  createAsyncThunk(
    'user/update',
    async (user: Partial<TRegisterData>, { rejectWithValue }) => {
      try {
        const updatedUser = await updateUserApi(user);
        return updatedUser;
      } catch (error) {
        return rejectWithValue('Обновление пользователя не удалось');
      }
    }
  );

export const apiUserRegister = //createAsyncThunk('user/register', registerUserApi);
  createAsyncThunk(
    'user/register',
    async (user: TRegisterData, { rejectWithValue }) => {
      const data = await registerUserApi(user);
      if (!data?.success) {
        return rejectWithValue('Регистрация не удалась');
      }
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    }
  );

export const apiUserLogin = //createAsyncThunk('user/login', loginUserApi);
  createAsyncThunk(
    'user/login',
    async ({ email, password }: TLoginData, { rejectWithValue }) => {
      const data = await loginUserApi({ email, password });
      if (!data?.success) {
        return rejectWithValue('Вход не удался');
      }
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    }
  );

export const ApiUserLogout = createAsyncThunk('user/logout', async () => {
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.clear();
  });
});

export interface IUserState {
  isAuthDone: boolean;
  user: TUser;
  error: string | undefined;
}

export const initialState: IUserState = {
  isAuthDone: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUser: (state) => state.user,
    getAuthDone: (state) => state.isAuthDone,
    getEmail: (state) => state.user.email,
    getName: (state) => state.user.name,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiUserRegister.fulfilled, (state, action) => {
        state.isAuthDone = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(apiUserRegister.pending, (state) => {
        state.error = '';
      })
      .addCase(apiUserRegister.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(apiUserLogin.fulfilled, (state, action) => {
        state.isAuthDone = true;
        state.user.email = action.payload.email;
        state.error = '';
      })
      .addCase(apiUserLogin.rejected, (state, action) => {
        state.isAuthDone = false;
        state.error = action.error.message;
      })
      .addCase(apiUserLogin.pending, (state) => {
        state.isAuthDone = false;
        state.error = '';
      });
    builder
      .addCase(apiGetUser.fulfilled, (state, action) => {
        // console.log('user done');
        state.isAuthDone = true;
        state.user = action.payload.user;
      })
      .addCase(apiGetUser.rejected, (state, action) => {
        // console.log('error', action.error.message);
        state.isAuthDone = false;
        state.error = action.error.message;
      });
    builder
      .addCase(apiUpdateUser.fulfilled, (state, action) => {
        state.isAuthDone = true;
        state.user = action.payload.user;
      })
      .addCase(apiUpdateUser.rejected, (state, action) => {
        state.isAuthDone = false;
        state.error = action.error.message!;
      })
      .addCase(apiUpdateUser.pending, (state) => {
        state.error = '';
      });
    builder.addCase(ApiUserLogout.fulfilled, (state) => {
      state.isAuthDone = false;
      state.user = { email: '', name: '' };
    });
  }
});

export const { getAuthDone, getUser, getName, getError, getEmail } =
  userSlice.selectors;
export const userReducer = userSlice.reducer;
