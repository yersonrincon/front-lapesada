import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProveeedorComponent } from './listar-proveedor.component';

describe('ListarProveedorComponent', () => {
  let component: ListarProveeedorComponent;
  let fixture: ComponentFixture<ListarProveeedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProveeedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProveeedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
