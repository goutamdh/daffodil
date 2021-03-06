import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { DaffOrderReducersState } from '../reducers/order-reducers.interface';
import { selectOrder, selectLoading } from '../selectors/order.selector';
import { Order } from '../../models/order/order';

@Component({
  selector: '[order-container]',
  template: '<ng-content></ng-content>',
  exportAs: 'OrderContainer'
})
export class OrderContainer implements OnInit {
  
  order$: Observable<Order>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<DaffOrderReducersState>
  ) { }

  ngOnInit() {
    this.order$ = this.store.pipe(select(selectOrder));
    this.loading$ = this.store.pipe(select(selectLoading));
  }
}
