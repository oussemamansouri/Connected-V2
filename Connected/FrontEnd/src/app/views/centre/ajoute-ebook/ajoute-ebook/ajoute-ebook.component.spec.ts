import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteEbookComponent } from './ajoute-ebook.component';

describe('AjouteEbookComponent', () => {
  let component: AjouteEbookComponent;
  let fixture: ComponentFixture<AjouteEbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouteEbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouteEbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
