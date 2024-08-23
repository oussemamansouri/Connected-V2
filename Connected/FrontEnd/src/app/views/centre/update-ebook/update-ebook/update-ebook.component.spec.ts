import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEbookComponent } from './update-ebook.component';

describe('UpdateEbookComponent', () => {
  let component: UpdateEbookComponent;
  let fixture: ComponentFixture<UpdateEbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
