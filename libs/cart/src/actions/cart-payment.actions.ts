import { Action } from '@ngrx/store';

import { DaffCart } from '../models/cart';
import { DaffCartPaymentMethod } from '../models/cart-payment';

export enum DaffCartPaymentActionTypes {
  CartPaymentLoadAction = '[DaffCart] Payment Load Action',
  CartPaymentLoadSuccessAction = '[DaffCart] Payment Load Success Action',
  CartPaymentLoadFailureAction = '[DaffCart] Payment Load Failure Action',
  CartPaymentUpdateAction = '[DaffCart] Payment Update Action',
  CartPaymentUpdateSuccessAction = '[DaffCart] Payment Update Success Action',
  CartPaymentUpdateFailureAction = '[DaffCart] Payment Update Failure Action',
  CartPaymentRemoveAction = '[DaffCart] Payment Remove Action',
  CartPaymentRemoveSuccessAction = '[DaffCart] Payment Remove Success Action',
  CartPaymentRemoveFailureAction = '[DaffCart] Payment Remove Failure Action',
}

export class DaffCartPaymentLoad implements Action {
  readonly type = DaffCartPaymentActionTypes.CartPaymentLoadAction;
}

export class DaffCartPaymentLoadSuccess<T extends DaffCartPaymentMethod> implements Action {
  readonly type = DaffCartPaymentActionTypes.CartPaymentLoadSuccessAction;

  constructor(public payload: T) {}
}

export class DaffCartPaymentLoadFailure implements Action {
  readonly type = DaffCartPaymentActionTypes.CartPaymentLoadFailureAction;

  constructor(public payload: string) {}
}

export class DaffCartPaymentUpdate<T extends DaffCartPaymentMethod> implements Action {
  readonly type = DaffCartPaymentActionTypes.CartPaymentUpdateAction;

  constructor(public payload: Partial<T>) {}
}

export class DaffCartPaymentUpdateSuccess<T extends DaffCart> implements Action {
  readonly type = DaffCartPaymentActionTypes.CartPaymentUpdateSuccessAction;

  constructor(public payload: Partial<T>) {}
}

export class DaffCartPaymentUpdateFailure implements Action {
  readonly type = DaffCartPaymentActionTypes.CartPaymentUpdateFailureAction;

  constructor(public payload: string) {}
}

export class DaffCartPaymentRemove implements Action {
  readonly type = DaffCartPaymentActionTypes.CartPaymentRemoveAction;
}

export class DaffCartPaymentRemoveSuccess implements Action {
  readonly type = DaffCartPaymentActionTypes.CartPaymentRemoveSuccessAction;
}

export class DaffCartPaymentRemoveFailure implements Action {
  readonly type = DaffCartPaymentActionTypes.CartPaymentRemoveFailureAction;

  constructor(public payload: string) {}
}

export type DaffCartPaymentActions<
  T extends DaffCartPaymentMethod,
  V extends DaffCart
> =
  | DaffCartPaymentLoad
  | DaffCartPaymentLoadSuccess<T>
  | DaffCartPaymentLoadFailure
  | DaffCartPaymentUpdate<T>
  | DaffCartPaymentUpdateSuccess<V>
  | DaffCartPaymentUpdateFailure
  | DaffCartPaymentRemove
  | DaffCartPaymentRemoveSuccess
  | DaffCartPaymentRemoveFailure
