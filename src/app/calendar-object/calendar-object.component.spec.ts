import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarObjectComponent } from './calendar-object.component';

describe('CalendarObjectComponent', () => {
  let component: CalendarObjectComponent;
  let fixture: ComponentFixture<CalendarObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarObjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
