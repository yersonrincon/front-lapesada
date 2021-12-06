import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosuministroComponent } from './registrosuministro.component';

describe('RegistrosuministroComponent', () => {
  let component: RegistrosuministroComponent;
  let fixture: ComponentFixture<RegistrosuministroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrosuministroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosuministroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
