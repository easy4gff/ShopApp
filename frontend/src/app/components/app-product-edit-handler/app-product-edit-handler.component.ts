import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

// Константы с тектом для кнопки
const LABEL_TEXT_EDIT_PRODUCT = 'Edit product';
const LABEL_TEXT_SAVE_CHANGES = 'Save changes';

@Component({
  selector: 'app-product-edit-handler',
  template:
  `
  <div class="ui-g-12">
    <button
        pButton
        type="button"
        (click)="handleButtonClick()"
        label="{{labelTextMap.get(this.editModeEnabled)}}"
        class="ui-button-success fullwidht-button">
    </button>
  </div>
  `,
  styleUrls: ['./app-product-edit-handler.component.css']
})
export class AppProductEditHandlerComponent implements OnInit {
  // Состояние режима редактирования
  @Input()  editModeEnabled: boolean;
  // Эвент для редактирования
  @Output() editModeChanged: EventEmitter<null> = new EventEmitter<null>();

  // Отображения для подстановки текста кнопки в зависимости от состояния режима редактирования
  private labelTextMap: Map<boolean, string> = new Map<boolean, string>();

  // Конструктор
  constructor() {
    this.labelTextMap.set(false, LABEL_TEXT_EDIT_PRODUCT);
    this.labelTextMap.set(true,  LABEL_TEXT_SAVE_CHANGES);
  }

  // Обработчик нажатия на кнопку
  handleButtonClick(): void {
      this.editModeChanged.emit(null);
  }

  ngOnInit(): void {}

}
