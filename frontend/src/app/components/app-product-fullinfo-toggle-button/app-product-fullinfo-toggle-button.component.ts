import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

// Константы с тектом для кнопки
const LABEL_TEXT_SHOW_FULL_INFO = 'Show full info';
const LABEL_TEXT_HIDE_FULL_INFO = 'Hide full info';

@Component({
  selector: 'app-product-fullinfo-toggle-button',
  template:
  `
  <div class="ui-g-12">
    <button
      pButton
      type="button"
      (click)="handleButtonClick()"
      label="{{labelTextMap.get(fullInfoModeEnabled)}}"
      class="ui-button-info fullwidht-button">
    </button>
  </div>
  `,
  styles: []
})
export class AppProductFullinfoToggleButtonComponent implements OnInit {

  // Состояние режима расширенной информации
  @Input() fullInfoModeEnabled: boolean;

  // Сигнал об изменении состояния режима расширенной информации
  @Output() fullInfoModeChanged: EventEmitter<null> = new EventEmitter<null>();

  // Отображения для подстановки текста кнопки в зависимости от состояния режима редактирования
  private labelTextMap: Map<boolean, string> = new Map<boolean, string>();

  // Конструктор
  constructor() {
    this.labelTextMap.set(false, LABEL_TEXT_SHOW_FULL_INFO);
    this.labelTextMap.set(true,  LABEL_TEXT_HIDE_FULL_INFO);
  }

  ngOnInit() {

  }

  handleButtonClick(): void {
    this.fullInfoModeChanged.emit(null);
  }

}
