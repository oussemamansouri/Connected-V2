import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLayouteComponent } from './client-layoute.component';

describe('ClientLayouteComponent', () => {
  let component: ClientLayouteComponent;
  let fixture: ComponentFixture<ClientLayouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLayouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientLayouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
