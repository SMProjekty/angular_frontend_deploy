import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { CalendarService } from '../calendar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IWorker } from '../interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css'],
  providers: [DatePipe]
})
export class VacationsComponent {

  nowDate = new Date();
  shortDate;
  monthIndex;
  dateNav: string = '';
  workers!: IWorker[];
  vacations!: any;
  activeVacation!: number;
  addNewVacation!: FormGroup;
  idToDel!: number;
  infoVacations!: any;

  constructor(private service: SharedService, private formBuilder: FormBuilder, private datePipe: DatePipe, private calendarService: CalendarService) {
    this.monthIndex = this.datePipe.transform(this.nowDate, 'M');
    this.shortDate = this.datePipe.transform(this.nowDate, 'yyyy');
    this.dateNav = this.calendarService.getMonthName(Number(this.monthIndex)-1) + ' ' + this.shortDate as string;
  }

  ngOnInit(): void {
    this.addNewVacation = this.formBuilder.group({
      worker: [null, Validators.required],
      date_from: [null, Validators.required],
      date_to: [null, Validators.required]
    });
    this.getWorkerList();
    this.getVacation(this.shortDate);
  }

  getWorkerList() {
    this.service.listOfWorkers().subscribe((res: IWorker[]) => {
      this.workers = res;
    });
  }

  getVacation(date: any) {
    this.service.getVacation(date).subscribe(res => {
      this.vacations = res;
    });
  }

  vacationIdToModal(id: Number) {
    this.idToDel = Number(id);
  }

  dateCount(type: boolean) {
    this.vacations = undefined;
    if(type)
      this.nowDate.setMonth(this.nowDate.getMonth() + 1);
    else
      this.nowDate.setMonth(this.nowDate.getMonth() - 1);
    this.monthIndex = this.datePipe.transform(this.nowDate, 'M');
    this.shortDate = this.datePipe.transform(this.nowDate, 'yyyy');
    this.dateNav = this.calendarService.getMonthName(Number(this.monthIndex)-1) + ' ' + this.shortDate as string;
    this.getVacation(this.datePipe.transform(this.nowDate, 'yyyy-MM'));
  }

  submitNewVacation() {
    var post_data = {
      "worker_id": this.addNewVacation.get('worker')?.value,
      "date_from": this.addNewVacation.get('date_from')?.value,
      "date_to": this.addNewVacation.get('date_to')?.value
    };
    this.service.addVacation(post_data).subscribe(res => {
      if(res =='Fields: worker cant be null.'){
        this.infoVacations = res;
        this.infoAlert('danger-alert-null');
      }
      if(res =='Fields: date_from and date_to cant be null.'){
        this.infoVacations = res;
        this.infoAlert('danger-alert-null');
      }
      if(res =='Employee is already on leave'){
        this.infoVacations = res;
        this.infoAlert('danger-alert-already');
      }
      if(res =='Leave added'){
        this.infoVacations = res;
        this.infoAlert('success-alert-add');
      }



    });
  }


  deleteVacation() {
    if (this.idToDel != undefined)
      this.service.deleteOffer(this.idToDel).subscribe(res => {
        // if(res=='Successfully deleted offer.')
        // {
        //   this.getVacation();
        //   this.infoAlert('success-alert-delete');
        // }
        // if(res!='Successfully deleted offer.'){
        //   this.getVacation();
        //   this.infoAlert('success-alert-delete');
        // }

      });
  }

  infoAlert(id: string) {
    document.getElementById(id)!.style.display = 'block';
    setTimeout(() => {
        document.getElementById(id)!.style.display = 'none';
    }, 3000);
  }

}
