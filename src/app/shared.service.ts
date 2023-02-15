import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IWorker, IVisit, IOffer } from './interfaces';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'http://3.75.172.118/';

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json'
    })
  };

  constructor(private http:HttpClient) {}

  //po udanym dodaniu wizyty przekierowanie na start i przekazanie daty
  //po udanym dodaniu usługi przekierowanie na widok usług + komunikat
  dateToMain:any;
  setMessage(data:any){
    this.dateToMain=data;
  }
  getMessage(){
    return this.dateToMain;
  }


  //klient
  customerInfo(x: any) { return this.http.post(this.APIUrl + '/customer/check',  x,); }
  //pracownik
  listOfWorkers() { return this.http.get<IWorker[]>(this.APIUrl + '/worker'); }
  deleteWorker(id: number) { return this.http.delete(this.APIUrl + '/worker/delete/' + id); }
  listOfColors() { return this.http.get(this.APIUrl + '/colors'); }
  listaPracownikow() { return this.http.get<IWorker[]>(this.APIUrl + '/worker'); } //do usuniecia pozniej

  addWorker(fd: any) { return this.http.post(this.APIUrl + '/worker/add', fd); }
  editWorker(id: number, fd: any) { return this.http.put(this.APIUrl + '/worker/edit/' + id, fd); }

  listAvailableHours(x: any) { return this.http.post(this.APIUrl + '/visit/available',  x); }
  listaDostepnychGodzin(x: any) { return this.http.post(this.APIUrl + '/visit/available',  x); }//do usuniecia pozniej

  //wizyta
  getVisits(x: any) { return this.http.post<IVisit[]>(this.APIUrl + '/visits', x); }
  addVisit(x: any) { return this.http.post(this.APIUrl + '/visit/add', x); }
  delVisit(x: number) { return this.http.delete(this.APIUrl + '/visit/del/' + x); }
  submitVisit(x: any) { return this.http.post(this.APIUrl + '/visit/submit', x); }
  restoreDoneVisit(x: number) { return this.http.get(this.APIUrl + '/visit/restore/' + x); }
  //availableHours(x: any) { return this.http.post(this.APIUrl + '/visit/available', x); }


  //usługa
  getOffers() { return this.http.get<IOffer[]>(this.APIUrl + '/offers', this.httpOptions); } //do usunięcia
  listaUslug() { return this.http.get(this.APIUrl + '/usluga'); } //do usunięcia
  listOfOffer() { return this.http.get<IOffer[]>(this.APIUrl + '/offer'); }
  addOffer(x: any) { return this.http.post(this.APIUrl + '/offer/add', x); }
  updateOffer(x: any, id: number) { return this.http.put(this.APIUrl + '/offer/update/' + id, x); }
  deleteOffer(id: number) { return this.http.delete(this.APIUrl + '/offer/delete/' + id); }

  //urlopy
  addVacation(x: any) { return this.http.post(this.APIUrl + '/vacation/add', x); }
  getVacation(date: string) { return this.http.get(this.APIUrl + '/vacation/' + date); }

  //raporty
  getRaport(x: any) { return this.http.post(this.APIUrl + '/raports', x); }

  saveImages(fd: any) { return this.http.post(this.APIUrl + '/photo', fd); }


}
