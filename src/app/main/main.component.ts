import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../shared.service';
import { DatePipe } from '@angular/common';
import { IWorker, IVisit } from '../interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [DatePipe]
})
export class MainComponent implements OnInit {

  dateFromMakeVisit:any;

  workers: IWorker[] = [];
  visits?: IVisit[];
  visitInfo?: string;
  nowDate = new Date();
  shortDate;
  dateNav: string = '';
  modalData: any = {
    'name': null,
    'surname': null,
    'phone': null,
    'offer': null,
    'time_start': null,
    'time': null,
    'price': null,
    'worker': null,
  };

  constructor(private service: SharedService, private datePipe: DatePipe) {
    this.shortDate = this.datePipe.transform(this.nowDate, 'yyyy-MM-dd');
    this.dateNav = this.shortDate as string;
  }

  ngOnInit(): void {
    this.dateFromMakeVisit=this.service.getMessage() //pobrnie z komponentu dodawania wizyt

    this.getListOfWorkers();
    if(this.dateFromMakeVisit == undefined){
      this.refreshVisits(this.dateNav);
    }
    if(this.dateFromMakeVisit != undefined){
      this.refreshVisits(this.dateFromMakeVisit);
      this.infoAlert('success-alert-addVisit')
    }
  }

  refreshVisits(date: string) {
    this.visits = undefined;
    this.dateNav = date;
    var x = {Date: date};
    this.service.getVisits(x).subscribe((res: IVisit[]) => {
        this.visits = res;
    });
  }

  getListOfWorkers() {
    this.service.listOfWorkers().subscribe((res: IWorker[]) => {
      this.workers = res;
      this.workers.forEach(worker => worker.checked = true);
    });
  }

  dataToModal(id: Number) {
    if (this.visits != undefined) {
      let index = this.visits.findIndex((obj: { id: Number; }) => obj.id === id);
      this.modalData['id'] = id;
      this.modalData['name'] = this.visits[index].customer.name;
      this.modalData['surname'] = this.visits[index].customer.surname;
      this.modalData['phone'] = this.visits[index].customer.phone;
      this.modalData['offer'] = this.visits[index].offer.name;
      this.modalData['time_start'] = this.visits[index].time;
      this.modalData['time'] = this.visits[index].offer.time;
      this.modalData['price'] = this.visits[index].offer.price;
      this.modalData['worker'] = this.visits[index].worker.name;
    }
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

  submitVisit() {
    this.service.submitVisit({id: this.modalData['id']}).subscribe(res => {
      if (res == 'Submitted visit.')
        this.infoAlert('success-alert-submitVisit');
      if (res == 'Critical error' || res == 'Variable empty')
        this.infoAlert('error-alert-submitVisit');
      this.refreshVisits(this.dateNav);
    });
  }

  deleteVisit() {
    this.service.delVisit(this.modalData['id']).subscribe(res => {
      if (res == 'Deleted visit.')
        this.infoAlert('success-alert-deleteVisit');
      if (res == 'Critical error')
        this.infoAlert('error-alert-deleteVisit');
      this.refreshVisits(this.dateNav);
    });
  }

  getDateFromModal(date: string) {
    let dateFromModal = new Date(date);
    this.nowDate = dateFromModal;
    this.shortDate = this.datePipe.transform(this.nowDate, 'yyyy-MM-dd');
    this.dateNav = this.shortDate as string;
    this.refreshVisits(date);
  }

  infoAlert(id: string) {
    document.getElementById(id)!.style.display = 'block';
    setTimeout(() => {
        document.getElementById(id)!.style.display = 'none';
    }, 3000);
  }
}
