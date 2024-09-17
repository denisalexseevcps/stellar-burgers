import {
  Feed,
  NotFound404,
  ConstructorPage,
  Login,
  ResetPassword,
  Register,
  ForgotPassword,
  ProfileOrders,
  Profile
} from '@pages';
import '../../index.css';
import { useDispatch } from '../../services/store';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import styles from './app.module.css';
import { apiGetUser } from '../../services/slices/userSlice';
import { apiGetIngredients } from '../../services/slices/ingredientsSlice';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(apiGetIngredients());
    dispatch(apiGetUser());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title={''} onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title={''} onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
