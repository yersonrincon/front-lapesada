import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUsuariovendedorComponent } from './listar-usuariovendedor.component';

describe('ListarUsuariovendedorComponent', () => {
  let component: ListarUsuariovendedorComponent;
  let fixture: ComponentFixture<ListarUsuariovendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarUsuariovendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarUsuariovendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
