import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMvisitComponent } from './calendar-mvisit.component';

describe('CalendarMvisitComponent', () => {
  let component: CalendarMvisitComponent;
  let fixture: ComponentFixture<CalendarMvisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarMvisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarMvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
