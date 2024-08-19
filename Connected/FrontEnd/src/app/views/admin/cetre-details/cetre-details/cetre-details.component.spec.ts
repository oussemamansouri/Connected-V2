import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CetreDetailsComponent } from './cetre-details.component';

describe('CetreDetailsComponent', () => {
  let component: CetreDetailsComponent;
  let fixture: ComponentFixture<CetreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CetreDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CetreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
