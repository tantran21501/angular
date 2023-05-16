import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUsingComponent } from './customer-using.component';

describe('CustomerUsingComponent', () => {
  let component: CustomerUsingComponent;
  let fixture: ComponentFixture<CustomerUsingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerUsingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUsingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
