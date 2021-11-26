import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosdiaComponent } from './registrosdia.component';

describe('RegistrosdiaComponent', () => {
  let component: RegistrosdiaComponent;
  let fixture: ComponentFixture<RegistrosdiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrosdiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosdiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
