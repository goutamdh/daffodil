import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'daffio-header',
  host: {'class': 'daffio-header'},
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DaffioHeaderComponent { }