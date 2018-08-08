import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store, StoreModule, combineReducers } from '@ngrx/store';

import { ShippingContainer } from './shipping.component';
import { ShippingAddress } from '@daffodil/core';
import { UpdateShippingInfo, SelectShippingOption } from '../actions/shipping.actions';
import * as fromShipping from '../reducers';
import { ShippingFactory } from '@daffodil/core';

describe('ShippingContainer', () => {
  let component: ShippingContainer;
  let fixture: ComponentFixture<ShippingContainer>;
  let store;
  let initialShippingInfo: ShippingAddress;
  let stubSelectedShippingOption: string;
  let stubIsShippingInfoValid: boolean;
  let shippingFactory: ShippingFactory;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          shippings: combineReducers(fromShipping.reducers),
        })
      ],
      declarations: [ ShippingContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingContainer);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    shippingFactory = new ShippingFactory();
    initialShippingInfo = shippingFactory.createShippingAddress();
    stubSelectedShippingOption = 'shippingOption';
    stubIsShippingInfoValid = true;

    spyOn(fromShipping, 'selectShippingInfoState').and.returnValue(initialShippingInfo);
    spyOn(fromShipping, 'selectShippingOptionState').and.returnValue(stubSelectedShippingOption);
    spyOn(fromShipping, 'selectIsShippingInfoValid').and.returnValue(stubIsShippingInfoValid);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngInit', () => {

    it('initializes shippingInfo$', () => {
      component.shippingInfo$.subscribe((shippingInfo) => {
        expect(shippingInfo).toEqual(initialShippingInfo);
      });
    });

    it('initializes selectedShippingOption$', () => {
      component.selectedShippingOption$.subscribe((shippingOption) => {
        expect(shippingOption).toEqual(stubSelectedShippingOption);
      })
    });

    it('initializes isShippingInfoValid$', () => {
      component.isShippingInfoValid$.subscribe((isShippingInfoValid) => {
        expect(isShippingInfoValid).toEqual(stubIsShippingInfoValid);
      })
    });
  });

  describe('updateShippingInfo', () => {
    
    it('should call store.dispatch with UpdateShippingInfo action', () => {
      component.updateShippingInfo(initialShippingInfo);

      expect(store.dispatch).toHaveBeenCalledWith(new UpdateShippingInfo(initialShippingInfo));
    });
  });

  describe('selectShippingOption', () => {
    
    it('should call store.dispatch with SelectShippingOption action', () => {
      component.selectShippingOption(stubSelectedShippingOption);

      expect(store.dispatch).toHaveBeenCalledWith(new SelectShippingOption(stubSelectedShippingOption));
    });
  });
});