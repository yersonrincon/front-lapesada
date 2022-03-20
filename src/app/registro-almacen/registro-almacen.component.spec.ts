import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAlmacenComponent } from './registro-almacen.component';

describe('RegistroAlmacenComponent', () => {
  let component: RegistroAlmacenComponent;
  let fixture: ComponentFixture<RegistroAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAlmacenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
