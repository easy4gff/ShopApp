import {
  Component,
  OnInit,
  Injectable
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product/product.model';
import { SERVER_URL } from '../app.props';
import { Observable } from 'rxjs/Observable';

// @Component({
//   selector: 'app-http-service',
//   templateUrl: './app-http-service.component.html',
//   styleUrls: ['./app-http-service.component.css']
// })
@Injectable()
// Интерфейс реализующий взаимодействие клиента с сервером
export class AppHttpServiceComponent implements OnInit {

  // Коструктор
  constructor(private http: HttpClient) {
    // this.refreshProducts();
  }

  // Обновить список продуктов
  refreshProducts(): Observable<Object> {
    // let products: Product[] = [];
    return this.http.get(`${SERVER_URL}/products`);
  }

  // Добавить продукт
  addProduct(product: Product): Observable<Object>  {
    console.log(product);
    return this.http.post(`${SERVER_URL}/products/add`, product);
            //  .subscribe(
            //    (status: object) => {
            //       console.log(status);
            //       this.refreshProducts();
            //    },
            //    (err) => {
            //      console.log(err);
            //    }
            //  );
  }

  // Удалить продукт
  deleteProduct(id: number): Observable<Object>  {
    return this.http.delete(`${SERVER_URL}/products?id=${id}`);
            // .subscribe((status: boolean) => {
            // console.log(status);
            // this.refreshProducts();
            // });
  }

  editProduct(product: Product): Observable<Object> {
    return this.addProduct(product);
  }

  // Получить полную информацию по продукту
  // getFullInfo(id: number): Observable<Object> {
  //   return this.http.get(`${SERVER_URL}/products/?id=${id}`);
  // }

  // Получить полную информацию по продукту
  getFullInfo(id: number): Observable<Object> {
    return this.http.post(`${SERVER_URL}products/fullinfo`, id);
  }

  ngOnInit() {
  }

}
