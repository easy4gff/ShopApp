import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { Product } from '../../models/product/product.model';
import { CommonModule } from '@angular/common';

import { TableModule, EditableColumn, CellEditor } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

import {
  imageToDataUri,
  loadResizedImageAndIconForLightbox
} from '../../utils/base64-image-utils';

// // Класс для свойства объекта
// class Property {
//   // Название свойства
//   title: string;
//   // Значение свойства
//   value: string;

//   // Конструктор
//   constructor(title: string, value: string) {
//     this.title = title;
//     this.value = value;
//   }
// }

const INPUT_OPACITY_BLOCKED: number = 0.7;
const INPUT_OPACITY_ENABLED: number = 1;

const IMAGE_ICON_WIDTH:  number = 230;
const IMAGE_ICON_HEIGHT: number = 200;
const IMAGE_FULL_WIDTH:  number = 500;
const IMAGE_FULL_HEIGHT: number = 400;

// Проверка корректности стоимости товара
function priceValidator(control: FormControl): { [s: string]: boolean } {
  if (isNaN(parseFloat(control.value))) {
    return { invalidPrice: true };
  }
  return null;
}

@Component({
  selector: 'app-product',
  template:
  `
  <div class="ui-g-12 product-item">
    <div class="ui-g-4 ui-md-4 ui-sm-12" style="text-align:center">
      <p-lightbox [images]="image" id="lightbox"></p-lightbox>
      <!-- <img width="230px" height="200px" [src]="'data:image/jpg;base64,'+product.image"> -->
    </div>

    <div class="ui-g-8 ui-md-8 ui-sm-12 inputs-container non-editable">
      <div class="ui-grid-row">
            <div class="ui-g-3 ui-md-3 ui-sm-6">Title:</div>
            <!-- <div class="ui-g-6 ui-md-6 ui-sm-6">{{ product.title }}</div> -->
            <div class="ui-g-6 ui-md-6 ui-sm-6">
                <input
                  class="ui-g-12 form-input"
                  id="title-input"
                  type="text"
                  value="{{product.title}}"
                  pInputText
                  [formControl]="form.controls['title']"
                  [style.opacity]="inputsOpacity"
                />
            </div>
        </div>

        <div class="ui-grid-row">
            <div class="ui-g-3 ui-md-3 ui-sm-6">Price:</div>
            <div class="ui-g-6 ui-md-6 ui-sm-6">
                <input
                  pInputText
                  class="ui-g-12 form-input"
                  id="price-input"
                  type="text"
                  value="{{product.price}}"
                  [formControl]="form.controls['price']"
                  [style.opacity]="inputsOpacity"
                />
            </div>
        </div>


        <div class="ui-grid-row" *ngIf="isSelected">
            <div class="ui-g-3 ui-md-3 ui-sm-12">Description:</div>
            <div class="ui-g-9 ui-md-9 ui-sm-12">
                <textarea
                    pInputTextarea
                    class="ui-g-12 form-input"
                    id="description-input"
                    value="{{product.description}}"
                    [rows]="5" [cols]="30"
                    autoResize="autoresize"
                    [formControl]="form.controls['description']"
                    [style.opacity]="inputsOpacity"
                >
                </textarea>
            </div>
        </div>

        <div class="ui-g-12" style="padding: 0px;" *ngIf="isSelected">
          <app-product-edit-handler
              [editModeEnabled]="editMode"
              [formValid]="form.valid"
              (editModeChanged)="toggleEditMode()"
          >
          </app-product-edit-handler>
      </div>
    </div>
    <ul class="buttons-list ui-g-12">
      <div class="ui-g-4" style="padding: 0px;">
          <app-product-fullinfo-toggle-button
              [fullInfoModeEnabled]="isSelected"
              (fullInfoModeChanged)="toggleFullInfo()"
          >
          </app-product-fullinfo-toggle-button>
      </div>

      <div class="ui-g-4">
          <button
            pButton
            type="button"
            (click)="emitDeleteEvent()"
            label="Delete product"
            class="ui-button-danger fullwidht-button"
          ></button>
      </div>
  </ul>
  </div>
  `,
  styleUrls: ['./app-product.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppProductComponent implements OnInit, OnChanges, AfterViewInit {
  // Продукт для отображения
  @Input() product: Product;
  // Флаг выбранности продукта
  @Input() isSelected: boolean;
  // Эвент для удаления продукта
  @Output() delete: EventEmitter<Product>;
  // Эвент для редактировани продукта
  @Output() edit: EventEmitter<Product>;
  // Эвент для показа/скрытия полной информации по продукту
  @Output() fullInfoStateChanged: EventEmitter<number>;

  // private params: Array<any>;

  // Свойства продукта для отображения
  // private properties: Map<string, string> = new Map<string, string>();
  // private propKeys: String[];
  // private properties: Property[];

  // Режим редактирования
  private editMode: boolean;

  // Форма
  private form: FormGroup;
  private inputsOpacity: number = INPUT_OPACITY_BLOCKED;

  private text: string;
  private image: any[] = [];

  // Конструктор компонента
  constructor(fb: FormBuilder, private cdref: ChangeDetectorRef) {
    this.delete = new EventEmitter<Product>();
    this.edit = new EventEmitter<Product>();
    this.fullInfoStateChanged = new EventEmitter<number>();
  }

  ngOnInit() {
    this.editMode = false;

    this.form = new FormGroup({
      title: new FormControl({ value: this.product.title, disabled: true }, Validators.required),
      price: new FormControl({ value: this.product.price, disabled: true }, Validators.compose([Validators.required, priceValidator])),
      description: new FormControl({ value: this.product.description, disabled: true })
    });

    loadResizedImageAndIconForLightbox(
      this.image,
      this.product.title,
      this.product.image,
      IMAGE_FULL_HEIGHT,
      IMAGE_FULL_WIDTH,
      IMAGE_ICON_HEIGHT,
      IMAGE_ICON_WIDTH
    );
    console.log(this.image);

    console.log('ngOnInit completed');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngOnChanges(): void {}

  handleEditComplete(event: any): void {
    console.log('OnEditComplete', event);
  }

  handleEditCancel() {
    console.log('OnEditCancel');
  }

  handleEdit() {
    console.log('OnEdit');
  }

  lockControls(): void {
    this.form.controls['price'].disable();
    this.form.controls['title'].disable();
    this.form.controls['description'].disable();
    this.inputsOpacity = INPUT_OPACITY_BLOCKED;
  }

  unlockControls(): void {
    this.form.controls['price'].enable();
    this.form.controls['title'].enable();
    this.form.controls['description'].enable();
    this.inputsOpacity = INPUT_OPACITY_ENABLED;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    console.log(this.editMode);

    if (!this.editMode) {
      this.lockControls();

      this.product.price = this.form.controls['price'].value;
      this.product.title = this.form.controls['title'].value;
      this.product.description = this.form.controls['description'].value;

      this.edit.emit(this.product);
    } else {
      this.unlockControls();
    }
  }

  // Послать сигнал удаления данного продукта
  emitDeleteEvent(): void {
    this.delete.emit(this.product);
  }

  // Послать сигнал редактирования данного продукта
  emitEditEvent(): void {
    this.edit.emit(this.product);
  }

  toggleFullInfo(): void {
    // isSelected has value before changes
    if (this.editMode && this.isSelected) {
      this.toggleEditMode();
    }

    this.fullInfoStateChanged.emit(this.product.id);
  }
}
