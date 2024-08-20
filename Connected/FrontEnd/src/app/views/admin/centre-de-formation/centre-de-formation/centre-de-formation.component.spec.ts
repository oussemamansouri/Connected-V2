import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreDeFormationComponent } from './centre-de-formation.component';

describe('CentreDeFormationComponent', () => {
  let component: CentreDeFormationComponent;
  let fixture: ComponentFixture<CentreDeFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentreDeFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentreDeFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
