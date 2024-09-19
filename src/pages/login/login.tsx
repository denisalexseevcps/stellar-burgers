import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
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

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(apiUserLogin({ email, password }));
    const errorText = error || '';
  };
  // console.log(isLoading);

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
