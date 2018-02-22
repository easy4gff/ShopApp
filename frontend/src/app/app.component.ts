import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { AppHttpServiceComponent } from './services/app-http-service/app-http-service.component';

import { Product } from './models/product/product.model';
import { Header } from 'primeng/primeng';
import { Footer } from 'primeng/primeng';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  template:
  `
  <header>
    <h1 id="header-title">Some header for shop!</h1>
  </header>

  <main>
    <div class="app-root center-grid">
      <div class="app-addproduct-div">
        <app-addproduct (add)="addProduct($event)"></app-addproduct>
      </div>
      <app-products
        [refreshRequester]="refresher"
      ></app-products>
    </div>
  </main>

  `,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  private refresher: Subject<null> = new Subject<null>();

  constructor(private productsService: AppHttpServiceComponent) {}

  // Загрузить продукт на сервер
  addProduct(p: Product): void {
    console.log(p);
      this.productsService.addProduct(p)
        .subscribe(
          () => {
            this.refresher.next(null);
          }
        );
  }

}
