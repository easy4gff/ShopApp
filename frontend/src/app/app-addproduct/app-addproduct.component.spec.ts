import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAddproductComponent } from './app-addproduct.component';

describe('AppAddproductComponent', () => {
  let component: AppAddproductComponent;
  let fixture: ComponentFixture<AppAddproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAddproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAddproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
