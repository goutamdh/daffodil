import { Injectable } from '@angular/core';
import * as faker from 'faker/locale/en_US';

import {
  MagentoCartItem,
  MagentoMoney,
} from '@daffodil/cart';
import { MagentoProduct } from '@daffodil/product';
import { MagentoProductFactory } from '@daffodil/product/testing';
import { DaffModelFactory } from '@daffodil/core/testing';

import { MagentoMoneyFactory } from './money.factory';

export class MockMagentoCartItem implements MagentoCartItem {
  id = faker.random.number(1000);
  prices = {
    price: this.money(),
    row_total: this.money(),
    row_total_including_tax: this.money(),
    total_item_discount: this.money()
  };
  product = this.createProduct();
  quantity = faker.random.number(20);

  private createProduct(): MagentoProduct {
    return (new MagentoProductFactory()).create()
  }

  private money(): MagentoMoney {
    return (new MagentoMoneyFactory()).create()
  }
}

@Injectable({
  providedIn: 'root'
})
export class MagentoCartItemFactory extends DaffModelFactory<MagentoCartItem> {

  constructor(){
    super(MockMagentoCartItem);
  }
}
