import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHttpServiceComponent } from './app-http-service.component';

describe('AppHttpServiceComponent', () => {
  let component: AppHttpServiceComponent;
  let fixture: ComponentFixture<AppHttpServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHttpServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHttpServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
