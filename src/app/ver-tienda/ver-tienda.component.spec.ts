import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTiendaComponent } from './ver-tienda.component';

describe('VerTiendaComponent', () => {
  let component: VerTiendaComponent;
  let fixture: ComponentFixture<VerTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
