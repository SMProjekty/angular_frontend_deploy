import { Component, OnInit, } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  workers: any;
  date_nav: string = '';

  visits: any = [];

  //   {datetime: "08:00 - 10:00", name: "Stylizacja", client: "Marta Kowalska", worker: "Basia", bgcolor: "#d1e7dd"},
  //   {datetime: "08:00 - 10:00", name: "Stylizacja i ścięcie", client: "Marta Kowalska", worker: "Kasia", bgcolor: "#f8d7da"},
  //   {datetime: "08:00 - 10:00", name: "Stylizacja i kolor", client: "Marta Kowalska", worker: "Asia", bgcolor: "#fff3cd"}
  // ];
  myForm!: FormGroup;
  listaUslug: any = null;
  //listaPracownikow: any;
  listaDostepnychGodzin: any = null;
  
  constructor(private service: SharedService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getListaPracownikow();
    //this.getListaUslug();
    // this.myForm = this.fb.group({
    //   pracownik: [1],
    //   usluga: [6],
    //   data: [],
    //   godzina: []
    // });
  }

  refreshVisits() {
    var x = {today_date: this.date_nav};
    console.log(x);
    this.service.getVisits(x).subscribe(res => {
      console.log(res)
      this.visits = res;
    });
  }

  // getListaUslug() {
  //   this.service.listaUslug().subscribe(res => this.listaUslug = res);
  // }

  getListaPracownikow() {
    this.service.listaPracownikow().subscribe(res => {
      this.workers = res;
    });
  }

  // getListaDostepnychGodzin(data: string) {
  //   this.service.listaDostepnychGodzin(data).subscribe(res => console.log(res));
  // }

  submitHandler() {
    //this.getListaDostepnychGodzin(this.myForm.controls['data'].value);
  }
}
