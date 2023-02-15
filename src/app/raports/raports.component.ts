import { Component, OnInit, } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-raports',
  templateUrl: './raports.component.html',
  styleUrls: ['./raports.component.css']
})

export class RaportsComponent {
  fileName='newReport.xlsx'

  newRaport!: FormGroup;

  dateToRaport:any;
  dateTh: any;

  constructor(private service: SharedService, private fb: FormBuilder) {}

  ngOnInit(): void {
  this.newRaport = this.fb.group({
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    typeOfReport: [null, Validators.required],
    });
  }

  getDateToRaport() {
    var postData = {
      "date_start": this.newRaport.get('startDate')?.value,
      "date_end": this.newRaport.get('endDate')?.value,
      "type_of_raport": this.newRaport.get('typeOfReport')?.value,
    };

    this.service.getRaport(postData).subscribe(res => {
      if (res == 'Variable empty') {
        this.infoAlert('danger-alert-report-backend');
      }
      else{
        this.dateToRaport=res;
        if(this.dateToRaport.hasOwnProperty(['details']['0'])){
          this.dateTh = this.dateToRaport['details']['0'];
        }
        this.infoAlert('success-alert-report');
      }
    });
  }

  exportExcel(){
    let element = document.getElementById("toExcel")
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)
    const wb:XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, this.fileName)

  }

  infoAlert(id: string) {
    document.getElementById(id)!.style.display = 'block';
    setTimeout(() => {
        document.getElementById(id)!.style.display = 'none';
    }, 3000);
  }

}
