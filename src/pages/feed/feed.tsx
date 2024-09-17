import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { getOrder, apiGetFeeds } from '../../services/slices/feedSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrder);
  console.log(orders.length);

  useEffect(() => {
    dispatch(apiGetFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
