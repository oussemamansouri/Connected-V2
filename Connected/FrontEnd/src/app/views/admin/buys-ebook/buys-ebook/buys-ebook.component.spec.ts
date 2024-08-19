import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuysEbookComponent } from './buys-ebook.component';

describe('BuysEbookComponent', () => {
  let component: BuysEbookComponent;
  let fixture: ComponentFixture<BuysEbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuysEbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuysEbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
