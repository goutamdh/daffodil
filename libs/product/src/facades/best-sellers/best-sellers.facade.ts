import { Injectable } from '@angular/core';
import { Store, select, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DaffStoreFacade } from '@daffodil/core';

import { DaffProduct } from '../../models/product';
import { DaffProductModule } from '../../product.module';
import { DaffProductReducersState } from '../../reducers/product-reducers-state.interface';
import { getDaffProductSelectors } from '../../selectors/public_api';

/**
 * A facade for accessing best sellers state from an application component.
 */
@Injectable({
  providedIn: DaffProductModule
})
export class DaffBestSellersFacade<T extends DaffProduct> implements DaffStoreFacade<Action> {
  /**
   * The loading state for getting best selling products.
   */
  loading$: Observable<boolean>;
  /**
   * Best selling products.
   */
  bestSellers$: Observable<DaffProduct[]>;

  constructor(private store: Store<DaffProductReducersState<T>>) {
		const {
			selectBestSellersProducts,
			selectBestSellersLoadingState
		} = getDaffProductSelectors<T>();

    this.loading$ = this.store.pipe(select(selectBestSellersLoadingState));
    this.bestSellers$ = this.store.pipe(select(selectBestSellersProducts));
  }

  /**
   * Dispatches an action to the rxjs action stream.
   * @param action 
   */
  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
