import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Store } from 'redux';
import { CommonModule } from '@angular/common';

import { DataListModule, PanelModule, MessageModule } from 'primeng/primeng';
import { ButtonModule, FileUploadModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/components/common/messageservice';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { GrowlModule } from 'primeng/growl';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductsComponent } from './app-products/products.component';
import { appStoreProviders } from './app.store';
import { ProductsState, ProductsReducer } from './product/products.reducer';
import { AppProductComponent } from './app-product/app-product.component';
import { AppAddproductComponent } from './app-addproduct/app-addproduct.component';
import { serverUrlProviders } from './app.props';
import { AppHttpServiceComponent } from './app-http-service/app-http-service.component';

import { FileValidator } from './fileValidator';
import { AppProductEditHandlerComponent } from './app-product-edit-handler/app-product-edit-handler.component';
import { AppProductFullinfoToggleButtonComponent } from './app-product-fullinfo-toggle-button/app-product-fullinfo-toggle-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    AppProductComponent,
    AppAddproductComponent,
    // AppHttpServiceComponent,
    FileValidator,
    AppProductEditHandlerComponent,
    AppProductFullinfoToggleButtonComponent
  ],
  imports: [
    BrowserModule,
    DataListModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    PanelModule,
    BrowserAnimationsModule,
    FileUploadModule,
    HttpClientModule,
    MessageModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    ConfirmDialogModule,
    GrowlModule
  ],
  providers: [
    appStoreProviders,
    serverUrlProviders,
    AppHttpServiceComponent,
    MessageService,
    TableModule,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
