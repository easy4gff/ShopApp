import {
  OnInit,
  Injectable
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product/product.model';
import { SERVER_URL } from '../../app.props';
import { Observable } from 'rxjs/Observable';

@Injectable()
// Интерфейс реализующий взаимодействие клиента с сервером
export class AppHttpServiceComponent implements OnInit {

  // Коструктор
  constructor(private http: HttpClient) {
    // this.refreshProducts();
  }

  // Обновить список продуктов
  refreshProducts(): Observable<Object> {
    return this.http.get(`${SERVER_URL}/products`);
  }

  // Добавить продукт
  addProduct(product: Product): Observable<Object>  {
    console.log(product);
    return this.http.post(`${SERVER_URL}/products/add`, product);
  }

  // Удалить продукт
  deleteProduct(id: number): Observable<Object>  {
    return this.http.delete(`${SERVER_URL}/products?id=${id}`);
  }

  editProduct(product: Product): Observable<Object> {
    return this.addProduct(product);
  }

  // Получить полную информацию по продукту
  getFullInfo(id: number): Observable<Object> {
    return this.http.post(`${SERVER_URL}products/fullinfo`, id);
  }

  ngOnInit() {
  }

}
