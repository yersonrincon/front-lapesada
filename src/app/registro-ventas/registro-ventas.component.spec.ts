import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroVentasComponent } from './registro-ventas.component';

describe('RegistroVentasComponent', () => {
  let component: RegistroVentasComponent;
  let fixture: ComponentFixture<RegistroVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroVentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
