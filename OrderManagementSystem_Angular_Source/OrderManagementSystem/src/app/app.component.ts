import { Component } from '@angular/core';
import { OrderComponent } from './order/order.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OrderComponent],
  template: '<app-order></app-order>'
})
export class AppComponent {}
