import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOffer } from '../interfaces';

@Component({
  selector: 'app-edit-del-service',
  templateUrl: './edit-del-service.component.html',
  styleUrls: ['./edit-del-service.component.css']
})

export class EditDelServiceComponent{

  infoAddOffer:any;
  updateOffer!: FormGroup;
  idToDel!: number;
  offerIdToUpdate: number = 0;

  offers: IOffer[] = [];

  modalData: any = {
    'name': null,
    'time': null,
    'price': null,
  };



  constructor(private service: SharedService, private formBuilder: FormBuilder){}


  ngOnInit(): void {
    this.getOffers();

    this.infoAddOffer=this.service.getMessage() //otrzymane z komponentu dodawania usług
    if(this.infoAddOffer == 'Successfully added offer.'){
      this.infoAlert('success-alert-addOffer')
    }

    this.updateOffer = this.formBuilder.group({
          name: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(25)])],
          time: [null, [ Validators.required ]],
          price: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)])]
        });
  }

  getOffers(){
    this.service.listOfOffer().subscribe((res: IOffer[]) => {
      this.offers = res;
    });
  }

  dataToModal(id: Number) {
    let index = this.offers.findIndex((obj: { id: Number; }) => obj.id === id);
    this.updateOffer.get('name')?.setValue(this.offers[index]['name']);
    this.updateOffer.get('time')?.setValue(this.offers[index]['time']);
    this.updateOffer.get('price')?.setValue(this.offers[index]['price']);
    this.offerIdToUpdate = this.offers[index]['id'];
  }

  offerIdToModal(id: Number) {
    this.idToDel = Number(id);
  }

  submitUpdateOffer() {
    var post_data = {
      "name": this.updateOffer.get('name')?.value,
      "time": this.updateOffer.get('time')?.value,
      "price": this.updateOffer.get('price')?.value
    };
    this.service.updateOffer(post_data, this.offerIdToUpdate).subscribe(res => {

      if (res = "Fields: name, price and time cant be null.")
        this.infoAlert('danger-alert-null');

      if (res = "Successfully updated offer."){
        this.getOffers();
        this.infoAlert('success-alert-update');
      }
    });
  }

  deleteOffer() {
    if (this.idToDel != undefined)
      this.service.deleteOffer(this.idToDel).subscribe(res => {
        if(res=='Successfully deleted offer.')
        {
          this.getOffers();
          this.infoAlert('success-alert-delete');
        }
        if(res!='Successfully deleted offer.'){
          this.getOffers();
          this.infoAlert('success-alert-delete');
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

