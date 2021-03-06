import {
  DaffCartActionTypes,
} from '../../actions/public_api';
import { initialState } from '../cart-initial-state';
import { DaffCartReducerState } from '../cart-state.interface';
import { ActionTypes } from '../action-types.type';
import { DaffCartErrorType } from '../cart-error-type.enum';
import { DaffCart } from '../../models/cart';

function addError<T extends DaffCart>(state: DaffCartReducerState<T>, error: string) {
  return {
    ...state,
    errors: {
      ...state.errors,
      [DaffCartErrorType.Cart]: state.errors[DaffCartErrorType.Cart].concat(new Array(error))
    }
  };
}

function resetErrors<T extends DaffCart>(state: DaffCartReducerState<T>) {
  return {
    errors: {
      ...state.errors,
      [DaffCartErrorType.Cart]: []
    }
  };
}

export function cartReducer<T extends DaffCart>(
  state = initialState,
  action: ActionTypes
): DaffCartReducerState<T> {
  switch (action.type) {
    case DaffCartActionTypes.CartLoadAction:
    case DaffCartActionTypes.CartClearAction:
    case DaffCartActionTypes.AddToCartAction:
    case DaffCartActionTypes.CartCreateAction:
      return { ...state, loading: true };

    case DaffCartActionTypes.CartLoadSuccessAction:
    case DaffCartActionTypes.CartClearSuccessAction:
    case DaffCartActionTypes.AddToCartSuccessAction:
    case DaffCartActionTypes.CartCreateSuccessAction:
      return {
        ...state,
        ...resetErrors(state),
        cart: {
          ...state.cart,
          ...action.payload
        },
        loading: false,
      };

    case DaffCartActionTypes.CartLoadFailureAction:
    case DaffCartActionTypes.CartClearFailureAction:
    case DaffCartActionTypes.AddToCartFailureAction:
    case DaffCartActionTypes.CartCreateFailureAction:
      return {
        ...state,
        ...addError(state, action.payload),
        loading: false,
      };

    default:
      return state;
  }
}
