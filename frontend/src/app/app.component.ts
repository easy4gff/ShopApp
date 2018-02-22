import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { AppHttpServiceComponent } from './app-http-service/app-http-service.component';

import { Product } from './product/product.model';
import {Header} from 'primeng/primeng';
import {Footer} from 'primeng/primeng';

import { Observable } from 'rxjs/Observable';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  private refresher: Subject<null> = new Subject<null>();

  constructor(private productsService: AppHttpServiceComponent) {
  }

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
