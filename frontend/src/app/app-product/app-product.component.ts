import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { Product } from '../product/product.model';
import { CommonModule } from '@angular/common';

import { TableModule, EditableColumn, CellEditor } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

// Класс для свойства объекта
class Property {
  // Название свойства
  title: string;
  // Значение свойства
  value: string;

  // Конструктор
  constructor(title: string, value: string) {
    this.title = title;
    this.value = value;
  }
}

// Проверка корректности стоимости товара
function priceValidator(control: FormControl): { [s: string]: boolean } {
  if (isNaN(parseFloat(control.value))) {
    return { invalidPrice: true };
  }
  return null;
}

@Component({
  selector: 'app-product',
  templateUrl: './app-product.component.html',
  styleUrls: ['./app-product.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppProductComponent implements OnInit, OnChanges {
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
  private properties: Map<string, string> = new Map<string, string>();
  private propKeys: String[];
  // private properties: Property[];

  // Режим редактирования
  private editMode: boolean;

  // Форма
  private form: FormGroup;

  private text: string;

  // Конструктор компонента
  constructor(fb: FormBuilder) {
    this.delete = new EventEmitter<Product>();
    this.edit = new EventEmitter<Product>();
    this.fullInfoStateChanged = new EventEmitter<number>();
  }

  ngOnInit() {
    // this.params = [
    //   { header: "Title", value: this.product.title },
    //   { header: "Price", value: this.product.price }
    // ];

    // this.properties = [
    //   new Property('Title', this.product.title),
    //   new Property('Price', this.product.price.toString())
    // ];

    // console.log("!!!");
    // this.properties.set('Title', this.product.title);
    // this.properties.set('Price', this.product.price.toString());
    // this.propKeys = Array.from(this.properties.keys());
    this.editMode = false;
    // this.editMode = false;

    this.form = new FormGroup({
      title: new FormControl({ value: this.product.title, disabled: true }, Validators.required),
      price: new FormControl({ value: this.product.price, disabled: true }, Validators.required),
      description: new FormControl({ value: this.product.description, disabled: true }, Validators.required),
    });

    // console.log(this.product.description);
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
  }

  unlockControls(): void {
    this.form.controls['price'].enable();
    this.form.controls['title'].enable();
    this.form.controls['description'].enable();
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
