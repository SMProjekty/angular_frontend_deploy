import { Component, OnInit, } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { IWorker } from '../interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [DatePipe]
})
export class MainComponent implements OnInit {
  nowDate = new Date();
  shortDate;
  workers: any = [];
  dateNav: string = ''
  visits: any = [];
  modalData: any = {
    'imie': null,
    'nazwisko': null,
    'telefon': null,
    'usluga': null,
    'godzina_roz': null,
    'godzina_zak': null,
    'koszt': null,
    'fryzjer': null,
  }
  //testowo Basia
  workerStatus: boolean = true;
  color: string = '#ff476e';

  //   {datetime: "08:00 - 10:00", name: "Stylizacja", client: "Marta Kowalska", worker: "Basia", bgcolor: "#d1e7dd"},
  //   {datetime: "08:00 - 10:00", name: "Stylizacja i ścięcie", client: "Marta Kowalska", worker: "Kasia", bgcolor: "#f8d7da"},
  //   {datetime: "08:00 - 10:00", name: "Stylizacja i kolor", client: "Marta Kowalska", worker: "Asia", bgcolor: "#fff3cd"}
  // ];
  listaUslug: any = null;
  //listaPracownikow: any;
  listaDostepnychGodzin: any = null;
  
  constructor(private service: SharedService, private datePipe: DatePipe) {
    this.shortDate = this.datePipe.transform(this.nowDate, 'dd-MM-yyyy');
    this.dateNav = this.shortDate as string;
  }

  ngOnInit(): void {
    this.getListaPracownikow();
    this.refreshVisits();
  }

  refreshVisits() {
    var x = {today_date: this.shortDate + "08:00:00"};
    this.service.getVisits(x).subscribe(res => {
      this.visits = res;
    });
  }

  getListaPracownikow() {
    this.service.listaPracownikow().subscribe(res => {
      this.workers = res;
      console.log(this.workers);
    });
  }


  //przyciski
  dataToModal(id: Number) {
    let index = this.visits.findIndex((obj: { id: Number; }) => obj.id === id);
    this.modalData['imie'] = this.visits[index]['idKlienta']['imie'];
    this.modalData['nazwisko'] = this.visits[index]['idKlienta']['nazwisko'];
    this.modalData['telefon'] = this.visits[index]['idKlienta']['numerTelefonu'];
    this.modalData['usluga'] = this.visits[index]['idUslugi']['nazwa'];
    this.modalData['godzina_roz'] = '8:00';
    this.modalData['godzina_zak'] = '8:30';
    this.modalData['koszt'] = this.visits[index]['idUslugi']['koszt'];
    this.modalData['fryzjer'] = this.visits[index]['idPracownika']['imie'];
  }

  dateCount(type: boolean) {
    if(type)
      this.nowDate.setDate(this.nowDate.getDate() + 1);
    else
      this.nowDate.setDate(this.nowDate.getDate() - 1);
    this.shortDate = this.datePipe.transform(this.nowDate, 'dd-MM-yyyy');
    this.dateNav = this.shortDate as string;
    this.refreshVisits();
  }

  changeWorkerStatus(id :number) {
    if(this.workerStatus) {
      this.workerStatus = false;
      this.color = '#ffd6df';
      //zmianiać status wizyt pobranych, wyświetlane / nie wyświetlane
    }
    else {
      this.workerStatus = true;
      this.color = '#ff476e';
    }
  }
}
