import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCenterComponent } from './register-center.component';

describe('RegisterCenterComponent', () => {
  let component: RegisterCenterComponent;
  let fixture: ComponentFixture<RegisterCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
