import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticheFidasComponent } from './statistiche-fidas.component';

describe('StatisticheFidasComponent', () => {
  let component: StatisticheFidasComponent;
  let fixture: ComponentFixture<StatisticheFidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticheFidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticheFidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
