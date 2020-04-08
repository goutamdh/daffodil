import { createSelector, MemoizedSelector } from '@ngrx/store';

import { DaffProductGridReducerState } from '../reducers/product-grid/product-grid-reducer-state.interface';
import { DaffProductReducersState } from '../reducers/product-reducers-state.interface';
import { getDaffProductFeatureSelectors } from './product-feature.selector';
import { DaffProduct } from '../models/product';

export interface DaffProductGridMemoizedSelectors<T extends DaffProduct> {
	selectProductGridState: MemoizedSelector<object, DaffProductGridReducerState<T>>;
	selectProductGridLoadingState: MemoizedSelector<object, boolean>;
}

const createProductGridSelectors = <T extends DaffProduct>(): DaffProductGridMemoizedSelectors<T> => {
	const {
		selectProductState
	} = getDaffProductFeatureSelectors<T>();
	/**
	 * Selector for Product Grid state.
	 */
	const selectProductGridState = createSelector(
		selectProductState,
		(state: DaffProductReducersState<T>) => state.productGrid
	);

	/**
	 * Selector for product grid loading state.
	 */
	const selectProductGridLoadingState = createSelector(
		selectProductGridState,
		(state: DaffProductGridReducerState<T>) => state.loading
	);

	return { 
		selectProductGridState,
		selectProductGridLoadingState
	}
}

const memoizeDaffProductGridSelectors = () => {
	let cache;
	return <T extends DaffProduct>(): DaffProductGridMemoizedSelectors<T> => cache = cache 
		? cache 
		: createProductGridSelectors<T>();
}

export const getDaffProductGridSelectors = memoizeDaffProductGridSelectors();
