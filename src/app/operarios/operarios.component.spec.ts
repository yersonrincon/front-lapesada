import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperariosComponent } from './operarios.component';

describe('OperariosComponent', () => {
  let component: OperariosComponent;
  let fixture: ComponentFixture<OperariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
