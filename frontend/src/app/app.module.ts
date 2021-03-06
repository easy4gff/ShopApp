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
import { DialogModule } from 'primeng/dialog';
import { LightboxModule } from 'primeng/lightbox';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/app-products/products.component';
import { appStoreProviders } from './app.store';
import { ProductsState, ProductsReducer } from './models/product/products.reducer';
import { AppProductComponent } from './components/app-product/app-product.component';
import { AppAddproductComponent } from './components/app-addproduct/app-addproduct.component';
import { AppProductEditHandlerComponent } from './components/app-product-edit-handler/app-product-edit-handler.component';
import {
  AppProductFullinfoToggleButtonComponent
} from './components/app-product-fullinfo-toggle-button/app-product-fullinfo-toggle-button.component';

import { serverUrlProviders } from './app.props';
import { AppHttpServiceComponent } from './services/app-http-service/app-http-service.component';

import { FileValidator } from './fileValidator';


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
    GrowlModule,
    DialogModule,
    LightboxModule
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
