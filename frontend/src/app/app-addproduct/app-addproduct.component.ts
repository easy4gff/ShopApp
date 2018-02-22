import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter
} from '@angular/core';
import { Store } from 'redux';
import { ProductsState } from '../product/products.reducer';
import { AppStore } from '../app.store';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { addProduct } from '../product/product.actions';
import { Product } from '../product/product.model';
import { FileValidator } from '../fileValidator';
import { MessageService } from 'primeng/components/common/messageservice';
// import { Message } from 'primeng/components/common/message';
import {SelectItem} from 'primeng/components/common/api';
import {Message} from 'primeng/components/common/api';

// Проверка корректности стоимости товара
function priceValidator(control: FormControl): { [s: string]: boolean } {
  if (isNaN(parseFloat(control.value))) {
    return { invalidPrice: true };
  }
  return null;
}

@Component({
  selector: 'app-addproduct',
  templateUrl: './app-addproduct.component.html',
  styleUrls: ['./app-addproduct.component.css']
})
export class AppAddproductComponent implements OnInit {
  // Флаг видимости формы
  private formVisible: boolean = false;
  private noImageWarning: boolean = false;

  private msgs: Message[] = [];

  // Форма
  private form: FormGroup;

  // Эвент для добавления продукта в список
  @Output() add: EventEmitter<Product>;

  // Конструктор компонента
  constructor(fb: FormBuilder, private messageService: MessageService) {
    this.form = fb.group({
      'title': ['', Validators.required],
      'price': ['', Validators.compose([Validators.required, priceValidator])],
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
    /*if (!this.imageChosen()) {
      alert("Image is was not chosen! Abort!");
      return;
    }*/
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
        fileBase64
      );
      this.add.emit(product);
      this.clearForm();
      this.toggleFormVisibility();
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
  }

  imageAbscenceStatus(): boolean {
    return this.noImageWarning = !this.imageChosen();
  }

  showError() {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'No image selected!', detail: 'Validation failed'});
}

}
