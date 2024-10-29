import {
    userReducer,
    apiGetUser,
    apiUpdateUser,
    apiUserRegister,
    apiUserLogin,
    ApiUserLogout,
    initialState
  } from './userSlice';
  
  describe('тест асинхронных экшенов', () => {
    describe('загрузка пользователя', () => {
      it('тест apiGetUser.pending', () => {
        const action = {
          type: apiGetUser.pending.type
        };
  
        const newState = userReducer(initialState, action);
        expect(newState).toEqual({
          user: { email: '', name: '' },
          isAuthDone: false,
          error: ''
        });
      });
  
      it('тест apiGetUser.rejected', () => {
        const action = {
          type: apiGetUser.rejected.type,
          error: { message: 'test' }
        };
  
        const newState = userReducer(initialState, action);
        expect(newState).toEqual({
          user: { email: '', name: '' },
          isAuthDone: false,
          error: 'test'
        });
      });
  
      it('тест apiGetUser.fulfilled', () => {
        const action = {
          type: apiGetUser.fulfilled.type,
          payload: { user: 'test' }
        };
  
        const newState = userReducer(initialState, action);
        expect(newState).toEqual({
          user: 'test',
          isAuthDone: true,
          error: ''
        });
      });
    });
  
    describe('регистрация пользователя', () => {
      it('тест apiUserRegister.pending', () => {
        const action = {
          type: apiUserRegister.pending.type
        };
  
        const newState = userReducer(initialState, action);
        expect(newState).toEqual({
          user: { email: '', name: '' },
          isAuthDone: false,
          error: ''
        });
      });
  
      it('тест apiUserRegister.rejected', () => {
        const action = {
          type: apiUserRegister.rejected.type,
          error: { message: 'test' }
        };
  
        const newState = userReducer(initialState, action);
        expect(newState).toEqual({
          user: { email: '', name: '' },
          isAuthDone: false,
          error: 'test'
        });
      });
    });
  
    describe('авторизация пользователя', () => {
      it('тест apiUserLogin.pending', () => {
        const action = {
          type: apiUserLogin.pending.type
        };
  
        const newState = userReducer(initialState, action);
        expect(newState).toEqual({
          user: { email: '', name: '' },
          isAuthDone: false,
          error: ''
        });
      });
  
      it('тест apiUserLogin.rejected', () => {
        const action = {
          type: apiUserLogin.rejected.type,
          error: { message: 'test' }
        };
  
        const newState = userReducer(initialState, action);
        expect(newState).toEqual({
          user: { email: '', name: '' },
          isAuthDone: false,
          error: 'test'
        });
      });
  
      it('тест apiUserLogin.fulfilled', () => {
        const action = {
          type: apiUserLogin.fulfilled.type,
          payload: { email: 'test', name: 'test' } 
        };
  
        const newState = userReducer(initialState, action);
        expect(newState).toEqual({
            user: { email: 'test', name: 'test' },
          isAuthDone: true,
          error: ''
        });
      });
    });
  
    describe('выход из личного кабинета', () => {
      it('тест ApiUserLogout.fulfilled', () => {
        const action = {
          type: ApiUserLogout.fulfilled.type
        };
  
        const newState = userReducer(initialState, action);
        expect(newState).toEqual({
          user: { email: '', name: '' },
          isAuthDone: false,
          error: ''
        });
      });
    });
  
    describe('обновления профиля пользователя', () => {
      it('тест updateUser.pending', () => {
        const action = {
          type: apiUpdateUser.pending.type
        };
  
        const newState = userReducer(initialState, action);
        expect(newState).toEqual({
          user: { email: '', name: '' },
          isAuthDone: false,
          error: ''
        });
      });
      it('тест updateUser.rejected', () => {
        const action = {
          type: apiUpdateUser.rejected.type,
          error: { message: 'test' }
        };
  
        const newState = userReducer(initialState, action);
        expect(newState).toEqual({
          user: { email: '', name: '' },
          isAuthDone: false,
          error: 'test'
        });
      });
  
      it('тест updateUser.fulfilled', () => {
        const action = {
          type: apiUpdateUser.fulfilled.type,
          payload: { user: 'test' }
        };
        const newState = userReducer(initialState, action);
        expect(newState).toEqual({
          user: 'test',
          isAuthDone: true,
          error: ''
        });
      });
    });
  });
