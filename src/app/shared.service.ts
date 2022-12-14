import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'http://127.0.0.1:8000';

  constructor(private http:HttpClient) {}

  getVisits(x: any) { return this.http.post(this.APIUrl + '/wizyta', x); }
  addVisit(x: any) { return this.http.post(this.APIUrl + '/wizyta/add', x); }
  listaUslug() { return this.http.get(this.APIUrl + '/usluga'); }
  listaPracownikow() { return this.http.get(this.APIUrl + '/pracownik'); }
  listaDostepnychGodzin(x: any) { return this.http.post(this.APIUrl + '/wizyta/termin',  x); }
}
