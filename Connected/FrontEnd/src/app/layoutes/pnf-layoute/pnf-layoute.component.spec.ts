import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnfLayouteComponent } from './pnf-layoute.component';

describe('PnfLayouteComponent', () => {
  let component: PnfLayouteComponent;
  let fixture: ComponentFixture<PnfLayouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnfLayouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PnfLayouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
