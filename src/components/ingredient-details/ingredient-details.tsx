import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { ingredientsState } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

interface TIngredientProps {
  title?: string;
}

export const IngredientDetails: FC<TIngredientProps> = (props) => {
  /** TODO: взять переменную из стора */
  // const ingredientData = null;
  const ingredients = useSelector(ingredientsState);
  const { id } = useParams();
  const ingredientData = ingredients.ingredients.find(
    (item) => item._id === id
  );
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI {...props} ingredientData={ingredientData} />;
};
