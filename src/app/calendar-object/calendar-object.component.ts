import { Component } from '@angular/core';
import { Day } from "../models/day.model";
import { CalendarService } from "../calendar.service";
import { Output, EventEmitter, Input } from '@angular/core';
import { ArgumentOutOfRangeError } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-calendar-object',
  templateUrl: './calendar-object.component.html',
  styleUrls: ['./calendar-object.component.css']
})
export class CalendarObjectComponent {
  @Output() sendDateEvent = new EventEmitter<string>();
  @Input() dateToColor: any[] = [];

  public monthDays!: Day[] ;

  public monthNumber!: number;
  public year!: number;

  public weekDaysName = ["Mo", "Tu", "We", "Th", "Fr", "Sa","Su"];

  constructor(public calendarCreator: CalendarService) {}

  ngOnInit(): void {
    this.setMonthDays(this.calendarCreator.getCurrentMonth());
  }

  sendDate(value: string) {
    this.sendDateEvent.emit(value);
  }

  onNextMonth(): void {
    this.monthNumber++;

    if (this.monthNumber == 12) {
      this.monthNumber = 0;
      this.year++;
    }

    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
  }

  onPreviousMonth() : void{
    this.monthNumber--;

    if (this.monthNumber < 0) {
      this.monthNumber = 11;
      this.year--;
    }

    this.setMonthDays(this.calendarCreator.getMonth(this.monthNumber, this.year));
  }

  private setMonthDays(days: Day[]): void {
    this.monthDays = days;
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }

  getDayFromCalendar(day: any) {
    let date = (day.number < 10) ? day.year + '-' + (day.monthIndex + 1) + '-' + '0' + day.number : + day.year + '-' + (day.monthIndex + 1) + '-' + day.number;
    this.sendDate(date);
  }

  colorSelected(event: any) {
    let id = event.srcElement.id;
    document.querySelectorAll('.day')?.forEach(element => {
      element.classList.remove('day-color');
    });
    document.getElementById(id)?.classList.add('day-color');
  }
}
