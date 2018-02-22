import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProductEditHandlerComponent } from './app-product-edit-handler.component';

describe('AppProductEditHandlerComponent', () => {
  let component: AppProductEditHandlerComponent;
  let fixture: ComponentFixture<AppProductEditHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppProductEditHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProductEditHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
