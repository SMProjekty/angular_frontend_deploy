import { IWorker, IOffer } from './../interfaces';
import { Component, OnInit} from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-make-visit',
  templateUrl: './make-visit.component.html',
  styleUrls: ['./make-visit.component.css']
})

export class MakeVisitComponent {
  workers: IWorker[]=[];
  offers: IOffer[]=[];

  customerInfo:any;
  listAvailableHours: any;

  addNewVisit!: FormGroup;

  modalData: any = {
    'imie': null,
    'nazwisko': null,
    'telefon': null,
    'usluga': null,
    'data': null,
    'godzina_roz': null,
    'godzina_zak': null,
    'koszt': null,
    'fryzjer': null,
  };

  constructor(private service: SharedService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.getListOfWorkers();
    this.getOffers();
    this.addNewVisit = this.fb.group({
      worker: [null, Validators.required],
      offer: [null, Validators.required],
      date: [null, Validators.required],
      hour: [null, Validators.required],
      phone: [null, Validators.compose([Validators.required, Validators.pattern("[0-9]{9}")])],
      name: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(25)])],
      surname:[null, Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(2)])]
    });
  }

  getListOfWorkers() {
    this.service.listOfWorkers().subscribe((res: IWorker[]) => {
      this.workers = res;
      this.workers.forEach(worker => worker.checked = false);
    });
  }

  getOffers() {
    this.service.listOfOffer().subscribe((res: IOffer[]) => {
     this.offers = res;
    });
  }

  //zmiana ofert = aktualizacja godzin
  changeOffer(){
    if(this.addNewVisit.get('date')?.value != undefined){
      this.checkAvailableHour(this.addNewVisit.get('date')?.value);
      }
  }

  checkAvailableHour(date: string) {
    let index = this.offers.findIndex((obj: { id: Number; }) => obj.id == this.addNewVisit.get('offer')?.value);
    var x = {
      date: date,
      offer_time: this.offers[index].time,
      worker_id: this.addNewVisit.get('worker')?.value};

    this.service.listAvailableHours(x).subscribe(res => {
    if(res =='Variable empty'){
      this.infoAlert('danger-alert-hours-base');
    }
    if(res =='Employee on leave'){
      this.listAvailableHours = res;
      this.infoAlert('danger-alert-vacation-base');
    }
    if(res =='No available time'){
      this.listAvailableHours = res;
      this.infoAlert('danger-alert-no-hours');
    }
    this.listAvailableHours = res;
    this.addNewVisit.get('hour')?.setValue(undefined); //wyczyszczenie wyboru godziny
    this.addNewVisit.get('date')?.setValue(date); //ustawianie zmiennej z formularza jako ta wybrana z kalendarza
    });
  }

  checkPhoneNumber() {
    var x = { "phone": this.addNewVisit.get('phone')?.value };
    this.service.customerInfo(x).subscribe(res => {

      if(res =='Phone number is null'){
        this.infoAlert('danger-alert-phone');
      }

      //brak pracownika w bazie
      if(res =='No phone number'){
        this.infoAlert('danger-alert-customer-base');
      }

      this.customerInfo = res;
      this.addNewVisit.get('name')?.setValue(this.customerInfo.name);
      this.addNewVisit.get('surname')?.setValue(this.customerInfo.surname);
      if (this.customerInfo.surname == undefined || this.customerInfo.name == undefined)
      {
        this.infoAlert('danger-alert-customer-base');
      }
    });
  }

  dataToModal() {
      let indexOffer = this.offers.findIndex((obj: { id: Number; }) => obj.id == this.addNewVisit.get('offer')?.value);
      let indexWorker = this.workers.findIndex((obj: { id: Number; }) => obj.id == this.addNewVisit.get('worker')?.value);
      this.modalData['name'] = this.addNewVisit.get('name')?.value;
      this.modalData['surname'] = this.addNewVisit.get('surname')?.value;
      this.modalData['phone'] = this.addNewVisit.get('phone')?.value;
      this.modalData['offer'] = this.offers[indexOffer].name;
      this.modalData['date'] = this.addNewVisit.get('date')?.value;
      this.modalData['time_start'] = this.addNewVisit.get('hour')?.value;
      this.modalData['time'] = this.offers[indexOffer].time;
      this.modalData['price'] = this.offers[indexOffer].price;
      this.modalData['worker'] = this.workers[indexWorker].name;
  }

  changeWorkerStatus(id :number) {
    let workerId = this.workers.findIndex((obj: { id: Number; }) => obj.id === id);
    if(this.workers[workerId].checked == false){
      this.workers.forEach(worker => worker.checked = false);
      this.workers[workerId].checked = true;
      this.addNewVisit.get('worker')?.setValue(id);
      }

      //zmiana pracownika = aktualizacja godzin
      if(this.addNewVisit.get('date')?.value != undefined){
      this.checkAvailableHour(this.addNewVisit.get('date')?.value);
      }
    }

    submitVisit() {
      var post_data = {
        "id_worker": this.addNewVisit.get('worker')?.value,
        "id_offer": this.addNewVisit.get('offer')?.value,
        "phone": this.addNewVisit.get('phone')?.value,
        "date": this.addNewVisit.get('date')?.value,
        "time": this.addNewVisit.get('hour')?.value,
        "name": this.addNewVisit.get('name')?.value,
        "surname": this.addNewVisit.get('surname')?.value

      };
      this.service.addVisit(post_data).subscribe(res => {
        if(res == 'Critical error'){
          this.ngOnInit()
          this.infoAlert('danger-alert-critical-backend');
          this.listAvailableHours= null;
        }
        if(res == 'Added visit'){
          this.service.setMessage(this.addNewVisit.get('date')?.value); //wysłanie daty do main
          this.router.navigate(['main']);
        }
      });
    }

    infoAlert(id: string) {
      document.getElementById(id)!.style.display = 'block';
      setTimeout(() => {
          document.getElementById(id)!.style.display = 'none';
      }, 3000);
    }

}
