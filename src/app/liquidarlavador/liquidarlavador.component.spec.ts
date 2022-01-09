import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidarlavadorComponent } from './liquidarlavador.component';

describe('LiquidarlavadorComponent', () => {
  let component: LiquidarlavadorComponent;
  let fixture: ComponentFixture<LiquidarlavadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidarlavadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidarlavadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
