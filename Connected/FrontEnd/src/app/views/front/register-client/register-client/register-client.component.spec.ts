import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClientComponent } from './register-client.component';

describe('RegisterClientComponent', () => {
  let component: RegisterClientComponent;
  let fixture: ComponentFixture<RegisterClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
