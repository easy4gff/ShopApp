import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { Product } from '../../models/product/product.model';
import { FileValidator } from '../../fileValidator';

import { MessageService } from 'primeng/components/common/messageservice';
import { SelectItem } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';
import { Header } from 'primeng/primeng';
import { Footer } from 'primeng/primeng';

// Проверка корректности стоимости товара
function priceValidator(control: FormControl): { [s: string]: boolean } {
  if (isNaN(parseFloat(control.value))) {
    return { invalidPrice: true };
  }
  return null;
}

@Component({
  selector: 'app-addproduct',
  template: `
  <!-- Add product dialog -->
  <p-dialog
    header="New product information"
    [(visible)]="formVisible"
    [draggable]="false"
    [resizable]="false"
    [modal]="true"
    [width]="640"
  >
    <div class="ui-g">
      <div class="ui-g-12">
        <form [formGroup]="form" *ngIf="formVisible">
          <!-- <p-panel header="New product"> -->
              <div class="inputs-div">
                <div class="ui-grid-row input-item">
                  <div class="ui-grid-col-3">
                  <label for="titleInput">Title</label>
                  </div>
                  <div class="ui-grid-col-9">
                    <input pInputText type="text" id="titleInput" placeholder="title" [formControl]="form.controls['title']">
                  </div>
                </div>

                <div class="ui-grid-row input-item">
                  <div class="ui-grid-col-3">
                    <label for="priceInput">Price</label>
                  </div>
                  <div  class="ui-grid-col-9">
                    <input pInputText type="text" id="priceInput" placeholder="price" [formControl]="form.controls['price']">
                  </div>
                </div>

                <div class="ui-grid-row input-item">
                  <div class="ui-grid-col-3">
                    <label for="priceInput">Price</label>
                  </div>
                  <div  class="ui-grid-col-9">
                    <textarea
                      pInputTextarea
                      placeholder="description"
                      id="descriptionInput"
                      [rows]="5" [cols]="40"
                      autoResize="autoresize"
                      [formControl]="form.controls['description']"
                    >
                    </textarea>
                  </div>
                </div>

                <div class="ui-grid-row input-item">
                  <div class="ui-grid-col-3">
                    <label for="imageSrcInput">Image</label>
                  </div>
                  <div class="ui-grid-col-9">
                    <input
                      type="file"
                      name="imageFile"
                      id="imageSrcInput"
                      accept="image/jpeg,image/png"
                      [formControl]="form.controls['image']"
                    />
                  </div>
                </div>
              </div>

              <div class="warning-divs ui-g ui-fluid">
                <p-message severity="error" text="Image is required" *ngIf="noImageWarning" class="centered-text ui-g-12"></p-message>
              </div>

              <div class="ui-g">
                <!-- <p-footer class="ui-g-12" style="border: 1px solid black"> -->
                  <ul class="button-list ui-g-12">
                      <li class="ui-g-6">
                          <button pButton
                                  type="submit"
                                  (click)="addProduct()"
                                  iconPos="right"
                                  label="Add"
                                  [disabled]="!form.valid"
                                  class="full-width"
                          ></button>
                      </li>

                      <li class="ui-g-6">
                        <button pButton
                                (click)="formVisible = false;"
                                iconPos="right"
                                label="Cancel"
                                class="full-width"
                        ></button>
                      </li>
                  </ul>
                <!-- </p-footer> -->
              </div>

          <!-- </p-panel> -->
        </form>
      </div>
    </div>
  </p-dialog>

  <!-- Button "Add new product"-->
  <div class="ui-g">
    <div class="ui-g-12">
      <button
        pButton
        type="button"
        (click)="toggleFormVisibility()"
        icon="fa-check"
        iconPos="right"
        label="Add new product"
        style="width: 100%"
        class="addprod-button"
        >
      </button>
    </div>
  </div>
  `,
  styles: [
  `
    .full-width {
      width: 100% !important;
    }

    .centered-text {
      text-align: center;
    }

    .button-list {
      list-style-type: none;
    }

    .button-list {
      padding: 0px;
      margin: 0px;
    }

    .addprod-button {
      margin: 10px;
      padding: 10px;
    }
  `
  ]
})
export class AppAddproductComponent implements OnInit {
  // Флаг видимости формы
  private formVisible: boolean = false;
  private noImageWarning: boolean = false;

  // Сообщения для оповещений
  private msgs: Message[] = [];

  // Форма
  private form: FormGroup;

  // Эвент для добавления продукта в список
  @Output() add: EventEmitter<Product>;

  // Конструктор компонента
  constructor(
    fb: FormBuilder,
    private messageService: MessageService,
  ) {
    this.form = fb.group({
      'title': ['', Validators.required],
      'price': ['', Validators.compose([Validators.required, priceValidator])],
      'description': [''],
      'image': [''/*, FileValidator.validate*/]
    });
    this.add = new EventEmitter<Product>();
  }

  ngOnInit() {
  }

  // Показать/скрыть форму
  toggleFormVisibility(): void {
    this.formVisible = this.formVisible ? false : true;
    // if (this.formVisible) {
    //   window.scrollTo(0, document.body.scrollHeight);
    // }
  }

  // Добавить продукт на сервер
  addProduct(): void {
    if (this.imageAbscenceStatus()) {
      return;
    }

    const file: File = (<HTMLInputElement>document.getElementById('imageSrcInput')).files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any): void => {
      const fileBase64: string = reader.result.split(',')[1];
      const product = new Product(
        543526235,
        this.form.controls['price'].value,
        this.form.controls['title'].value,
        fileBase64,
        null,
        this.form.controls['description'].value,
      );
      this.add.emit(product);
      this.clearForm();
      this.toggleFormVisibility();
      this.messageService.add({severity: 'success', summary: 'Add action', detail: 'This product was successfully added to the server!'});
    };

    reader.readAsDataURL(file);
  }

  // Проверяет, выбрано ли изображение для продукта
  imageChosen(): boolean {
    console.log((<HTMLInputElement>document.getElementById('imageSrcInput')).files.length === 1);
    return (<HTMLInputElement>document.getElementById('imageSrcInput')).files.length === 1;
  }

  //
  clearForm(): void {
    this.form.controls['title'].setValue('');
    this.form.controls['price'].setValue('');
    this.form.controls['image'].setValue('');
    this.form.controls['description'].setValue('');
  }

  imageAbscenceStatus(): boolean {
    return this.noImageWarning = !this.imageChosen();
  }

  showError() {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'No image selected!', detail: 'Validation failed'});
}

}
