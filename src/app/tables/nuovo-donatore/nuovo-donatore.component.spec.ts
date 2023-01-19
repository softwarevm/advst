import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoDonatoreComponent } from './nuovo-donatore.component';

describe('NuovoDonatoreComponent', () => {
  let component: NuovoDonatoreComponent;
  let fixture: ComponentFixture<NuovoDonatoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuovoDonatoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovoDonatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
