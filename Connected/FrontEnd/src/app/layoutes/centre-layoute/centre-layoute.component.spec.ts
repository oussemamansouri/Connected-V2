import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreLayouteComponent } from './centre-layoute.component';

describe('CentreLayouteComponent', () => {
  let component: CentreLayouteComponent;
  let fixture: ComponentFixture<CentreLayouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentreLayouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentreLayouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
