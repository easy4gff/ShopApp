// import {
//     OnInit,
//     Injectable
//   } from '@angular/core';

// import { AppHttpServiceComponent } from '../app-http-service/app-http-service.component';
// import { Product } from '../../models/product/product.model';
// import { Observable } from 'rxjs/Observable';
// import { identifierModuleUrl } from '@angular/compiler';

// import { ConfirmationService } from 'primeng/api';
// import { Message } from 'primeng/api';
// import { MessageService } from 'primeng/components/common/messageservice';

// @Injectable()
// // Интерфейс реализующий взаимодействие клиента с сервером
// export class AppProductsManagementService implements OnInit {

//     // Коструктор
//     constructor(
//         private appHttpService: AppHttpServiceComponent,
//         private confirmationService: ConfirmationService,
//         private messageService: MessageService
//     ) {
//         // this.refreshProducts();
//     }

//     // Обновить список продуктов
//     refreshProducts(): Observable<Object> {
//         return this.appHttpService.refreshProducts();
//     }

//     // Добавить продукт
//     addProduct(product: Product): Observable<Object>  {
//         return this.appHttpService.addProduct(product);
//     }

//     // Удалить продукт
//     deleteProduct(id: number): Observable<Object>  {
//         return this.appHttpService.deleteProduct(id);
//     }

//     editProduct(product: Product): Observable<Object> {
//         return this.addProduct(product);
//     }

//     // Получить полную информацию по продукту
//     getFullInfo(id: number): Observable<Object> {
//         return this.appHttpService.getFullInfo(id);
//     }

//     ngOnInit() {
//     }
// }
