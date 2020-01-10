import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaffFormFieldComponent } from './form-field.component';
import { DaffErrorMessageComponent } from './error-message/error-message.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DaffPrefixSuffixModule } from 'libs/design/src/core/prefix-suffix/prefix-suffix.module';
import { DaffFormLabelModule } from '../form-label/form-label.module';

@NgModule({
  imports: [
    CommonModule,

    FontAwesomeModule,
    DaffPrefixSuffixModule,
    DaffFormLabelModule
  ],
  exports: [
    DaffFormFieldComponent,
    DaffErrorMessageComponent
  ],
  declarations: [
    DaffFormFieldComponent,
    DaffErrorMessageComponent
  ]
})
export class DaffFormFieldModule { }
