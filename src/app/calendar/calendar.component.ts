import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { IWorker, IVisit } from '../interfaces';
import { DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DatePipe]
})

export class CalendarComponent {
  workers: IWorker[] = [];
  visits?: IVisit[];
  nowDate = new Date();
  dateNav: string = '';
  shortDate;

  constructor(private service: SharedService, private datePipe: DatePipe) {
    this.shortDate = this.datePipe.transform(this.nowDate, 'yyyy-MM-dd');
    this.dateNav = this.shortDate as string;
  }

  ngOnInit(): void {
    this.getListOfWorkers();
    this.refreshVisits(this.dateNav);
  }

  getListOfWorkers() {
    this.service.listOfWorkers().subscribe((res: IWorker[]) => {
      this.workers = res;
      this.workers.forEach(worker => worker.checked = true);
    });
  }

  refreshVisits(date: string) {
    this.visits = undefined;
    var x = {Date: date};
    this.service.getVisits(x).subscribe((res: IVisit[]) => {
      this.visits = res;
    })
  }

  changeWorkerStatus(id :number) {
    let workerId = this.workers.findIndex((obj: { id: Number; }) => obj.id === id);
    if(this.workers[workerId].checked)
      this.workers[workerId].checked = false;
    else
      this.workers[workerId].checked = true;
  }

  checkWorkerStatus(id: number): boolean {
    let workerId = this.workers.findIndex((obj: { id: Number; }) => obj.id === id);
    return this.workers[workerId].checked;
  }
}
