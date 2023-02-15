import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { IVisit } from '../interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-del-visit',
  templateUrl: './del-visit.component.html',
  styleUrls: ['./del-visit.component.css'],
  providers: [DatePipe]
})
export class DelVisitComponent {
  nowDate = new Date();
  shortDate;
  dateNav: string = '';
  visits?: IVisit[];
  id_to_modal?: number;

  constructor(private service: SharedService, private datePipe: DatePipe) {
    this.shortDate = this.datePipe.transform(this.nowDate, 'yyyy-MM-dd');
    this.dateNav = this.shortDate as string;
  }

  ngOnInit(): void {
    this.refreshVisits(this.dateNav);
  }

  refreshVisits(date: string) {
    this.visits = undefined;
    this.dateNav = date;
    var day = {"Date": date};
    this.service.getVisits(day).subscribe((res: IVisit[]) => {
      this.visits = res;
    });
  }

  getIdToModal(id: number) {
    this.id_to_modal = id;
  }

  delVisit() {
    if(this.id_to_modal != undefined) {
      this.service.delVisit(this.id_to_modal).subscribe(res => {
         console.log(res);
      });
      this.refreshVisits(this.dateNav);
    }
  }

  restoreVisit(visit_id: number) {
    this.service.restoreDoneVisit(visit_id).subscribe(res => {
      console.log(res);
    })
  }

  dateCount(type: boolean) {
    this.visits = undefined;

    if(type)
      this.nowDate.setDate(this.nowDate.getDate() + 1);
    else
      this.nowDate.setDate(this.nowDate.getDate() - 1);

    this.shortDate = this.datePipe.transform(this.nowDate, 'yyyy-MM-dd');
    this.dateNav = this.shortDate as string;
    this.refreshVisits(this.dateNav);
  }

  getDateFromModal(date: string) {
    let dateFromModal = new Date(date);
    this.nowDate = dateFromModal;
    this.shortDate = this.datePipe.transform(this.nowDate, 'yyyy-MM-dd');
    this.dateNav = this.shortDate as string;
    this.refreshVisits(date);
  }

  // infoAlert(id: string) {
  //   document.getElementById(id)!.style.display = 'block';
  //   setTimeout(() => {
  //       document.getElementById(id)!.style.display = 'none';
  //   }, 3000);
  // }
}
