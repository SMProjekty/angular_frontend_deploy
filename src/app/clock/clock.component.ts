import { Component } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: `{{time | date:'mediumTime'}}`,
  styleUrls: ['./clock.component.css']
})

export class ClockComponent {
  time?: Date;

  ngOnInit() {
    this.getCurrentDate();
  }

  getCurrentDate() {
    setInterval(() => {
    this.time = new Date();
    }, 1000);
  }
}
