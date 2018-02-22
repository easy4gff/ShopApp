import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProductFullinfoToggleButtonComponent } from './app-product-fullinfo-toggle-button.component';

describe('AppProductFullinfoToggleButtonComponent', () => {
  let component: AppProductFullinfoToggleButtonComponent;
  let fixture: ComponentFixture<AppProductFullinfoToggleButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppProductFullinfoToggleButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProductFullinfoToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
