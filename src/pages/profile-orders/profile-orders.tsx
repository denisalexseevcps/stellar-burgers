import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  apiGetOrder,
  getOrdersState,
  getUserOrders
} from '../../services/slices/ordersSlice';
import { useSelector, useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiGetOrder());
  });
  const orders: TOrder[] = useSelector(getUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
