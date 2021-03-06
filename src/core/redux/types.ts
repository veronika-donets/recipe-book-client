import { CategoryState } from '../../modules/categories/types';
import { AppState } from '../../modules/app/types';
import { AuthState } from '../../modules/auth/types';
import { History } from 'history';
import { RecipeState } from '../../modules/recipes/types';
import { IngredientState } from '../../modules/ingredients/types';
import { FormReducer } from 'redux-form/lib/reducer';

export interface RootReducerTypes {
    app: AppState;
    auth: AuthState;
    categories: CategoryState;
    recipes: RecipeState;
    ingredients: IngredientState;
    reduxForm: FormReducer;
    router: (history: History) => void;
}
