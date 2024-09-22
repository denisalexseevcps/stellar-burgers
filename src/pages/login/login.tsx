import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {
  getUser,
  apiUserLogin,
  getError,
  getAuthDone
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector(getAuthDone);
  const error = useSelector(getError);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  // console.log(isLoading);
  // console.log('error: ', error);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const errorText = error || '';
    dispatch(apiUserLogin({ email, password })).then(() => {});
  };

  if (isLoading) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <LoginUI
        errorText=''
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
      ;
    </>
  );
};
