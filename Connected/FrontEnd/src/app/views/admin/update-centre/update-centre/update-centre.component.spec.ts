import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCentreComponent } from './update-centre.component';

describe('UpdateCentreComponent', () => {
  let component: UpdateCentreComponent;
  let fixture: ComponentFixture<UpdateCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCentreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
