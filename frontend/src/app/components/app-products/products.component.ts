import {
  Component,
  Input,
  OnInit,
  Inject,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Product } from '../../models/product/product.model';
import { AppHttpServiceComponent } from '../../services/app-http-service/app-http-service.component';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';

import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-products',
  template:
  `
  <p-dataList
    [value]="products"
    paginator="true"
    rows="5"
  >
    <p-header class="data-list-header">Available products</p-header>
      <ng-template let-product pTemplate="item">
        <app-product
          [product]="product"
          [isSelected]="!!selectedProduct && product.id === selectedProduct.id"
          (delete)="confirmDeleteProduct($event)"
          (edit)="editProduct($event)"
          (fullInfoStateChanged)="changeSelectedId($event)"
        >
        </app-product>
      </ng-template>
  </p-dataList>

  <p-confirmDialog header="Confirmation"></p-confirmDialog>

  <p-growl [(value)]="notifications"></p-growl>
  `,
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() refreshRequester: Subject<null>;

  // Выбранный продукт
  private selectedProduct: Product;
  // Список всех продуктов
  private products: Product[];

  private notifications: Message[] = [];

  // Конструктор
  constructor(
    private http: HttpClient,
    private productsService: AppHttpServiceComponent,
    private cdref: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.refreshProducts();
  }

  // Загрузить продукты с сервера
  refreshProducts(): void {
    this.productsService.refreshProducts()
    .subscribe(
      (data: Object[]) => {
        this.products = data.map((obj: Product) => new Product(obj.id, obj.price, obj.title, obj.image, null, obj.description)).reverse();
        if (this.selectedProduct) {
          this.getFullInfo(this.selectedProduct.id);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // // Загрузить продукты с сервера
  // refreshProducts(): void {
  //   this.productsService.refreshProducts().toPromise()
  //     .then((data: Object[]) => {
  //       this.products =
  //          data.map((obj: Product) => new Product(obj.id, obj.price, obj.title, obj.image, null, obj.description)).reverse();
  //       setTimeout(() => {
  //         console.log('DATA LOADED');
  //       }, 3000);
  //     }).then(() => {
  //       if (this.selectedProduct) {
  //         this.getFullInfo(this.selectedProduct.id);
  //       }
  //       setTimeout(() => {
  //         console.log('SELECTED DATA LOADED');
  //         //this.products.splice(1);
  //       }, 3000);
  //     }).then(() => {
  //       // console.log(this.products);
  //       setTimeout(() => {
  //         console.log('END');
  //       }, 3000);
  //     });
  // }

  ngOnInit() {
    this.refreshRequester.subscribe(() => {
      this.refreshProducts();
    });
  }

  // Загрузить продукт на сервер
  addProduct(p: Product): void {
    // console.log(p);
     this.productsService.addProduct(p)
        .subscribe(
          () => {
            this.refreshProducts();
          }
        );
  }

  confirmDeleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.deleteProduct(product);
        this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'This product was succesfully deleted from the server!' });
      }
  });
}

  // Удалить продукт с сервера
  deleteProduct(product: Product): void {
    this.productsService.deleteProduct(product.id)
        .subscribe(
          () => {
            this.refreshProducts();
          }
        );
    // this.refreshProducts();
  }

  // Редактировать продукт
  editProduct(product: Product): void {
    // this.productsService.editProduct();
    this.messageService.add({ severity: 'success', summary: 'Edit', detail: 'This product\'s info was succesfully edited!' });
    this.addProduct(product);
    // this.productsService.addProduct(product);
  }

  // Получить полную информацию по продукту (включая описание)
  getFullInfo(id: number): void {
    this.productsService.getFullInfo(id).take(1)
        .subscribe((product: Product) => {
          const index: number = this.products.findIndex((prod: Product) => prod.id === product.id);
          if (index !== -1) {
            this.selectedProduct = product;
            this.products[index] = this.selectedProduct;
            // damn it, this is extremely stupid hack
            this.products = this.products.slice();
            // this.cdref.detectChanges();
          }
        });
  }

  changeSelectedId(selectedId: number) {
    if (!!this.selectedProduct && selectedId === this.selectedProduct.id) {
      this.selectedProduct = null;
      // this.cdref.detectChanges();
    } else {
      this.getFullInfo(selectedId);
    }
  }
}
