import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteCentreComponent } from './ajoute-centre.component';

describe('AjouteCentreComponent', () => {
  let component: AjouteCentreComponent;
  let fixture: ComponentFixture<AjouteCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouteCentreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouteCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
