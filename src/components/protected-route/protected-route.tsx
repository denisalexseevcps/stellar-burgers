import { useSelector } from '../../services/store';
import { getAuthDone, getUser } from '../../services/slices/userSlice';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(getAuthDone); // getAuthDone — селектор получения состояния загрузки пользователя
  const user = useSelector(getUser); // getUser — селектор получения пользователя из store
  const location = useLocation();
  // console.log(!user.name);
  // console.log('!isAuthChecked:', !isAuthChecked);

  // if (isAuthChecked) {
  //   // пока идёт чекаут пользователя, показываем прелоадер
  //   return <Preloader />;
  // }
  // console.log('!user.name', !user.name);
  // console.log('isAuthChecked', !onlyUnAuth);
  if (!onlyUnAuth && !user.name) {
    // console.log('переход здесь');
    return <Navigate replace to='/login' state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
  }

  if (onlyUnAuth && user.name) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
