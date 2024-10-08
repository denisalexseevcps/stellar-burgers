import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getConstructorState,
  getBurgerPrice,
  resetConstructor
} from '../../services/slices/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrderData,
  getOrderRequest,
  postOrder,
  clearOrderData
} from '../../services/slices/orderSlice';
import { getName, getEmail } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  const constructorItems = useSelector(getConstructorState);

  const dispatch = useDispatch();
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderData);
  const nameUser = useSelector(getName);
  const emailUser = useSelector(getEmail);
  const user = {
    name: nameUser || '',
    email: emailUser || ''
  };
  // const { user } = useSelector(selectUser);
  const navigate = useNavigate();

  // const orderRequest = false;

  // const orderModalData = null;

  const onOrderClick = () => {
    // console.log('constructorItems.bun', constructorItems.bun);
    // console.log('orderRequest', orderRequest);
    if (!constructorItems.bun || orderRequest) return;
    if (!user.name) {
      navigate('/login'), { replace: true };
      return;
    }
    const orderIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    // console.log('orderIngredients', orderIngredients);
    dispatch(postOrder(orderIngredients));
  };
  const closeOrderModal = () => {
    dispatch(resetConstructor());
    dispatch(clearOrderData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );
  // console.log(orderModalData);
  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
