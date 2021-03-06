import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { DaffGeographyEffects } from './effects/geography.effects';
import { daffGeographyReducers, DAFF_GEOGRAPHY_STORE_FEATURE_KEY } from './reducers/public_api';

@NgModule({
  imports: [
    StoreModule.forFeature(DAFF_GEOGRAPHY_STORE_FEATURE_KEY, daffGeographyReducers),
    EffectsModule.forFeature([
      DaffGeographyEffects,
    ]),
  ]
})
export class DaffGeographyStateModule {}
