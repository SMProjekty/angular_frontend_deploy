import { Component, OnInit, } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-make-visit',
  templateUrl: './make-visit.component.html',
  styleUrls: ['./make-visit.component.css']
})
export class MakeVisitComponent {
  workers: any;
  date_nav: string = '';
  listFreeHours: any;

  myForm!: FormGroup;
  listaUslug: any = null;
  listaDostepnychGodzin: any = null;
  
  constructor(private service: SharedService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getListaPracownikow();
    this.getListaUslug();
    this.myForm = this.fb.group({
      pracownik: [1],
      usluga: [6],
      data: [],
      godzina: [],
      telefon: []
    });
  }

  getListaPracownikow() {
    this.service.listaPracownikow().subscribe(res => {
      this.workers = res;
    });
  }

  getListaUslug() {
    this.service.listaUslug().subscribe(res => this.listaUslug = res);
  }

  //przyciski
  checkAnavibleHour() {
    var x = { "today_date": "2022-02-19 13:00:00" };
    this.service.listaDostepnychGodzin(x).subscribe(res => {
      this.listFreeHours = res;
      console.log(this.listFreeHours);
    });
  }

  submitHandler() {
    var x = {
      "id_pracownika": this.myForm.get('pracownik')?.value,
      "id_uslugi": this.myForm.get('usluga')?.value,
      "data": "2022-12-01 08:00",
      "godzina": "08:00",
      "telefon": "123234345"
    };
    this.service.addVisit(x).subscribe(res => {
      console.log(res);
    });
    //przekierowanie na stronę główną i powiadaomienie
  }
}
