import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent {
  addNewService!: FormGroup;

  constructor(private service: SharedService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.addNewService = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(25)])],
      time: [null, [ Validators.required ]],
      price: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)])]
    });
  }

  submitHandler() {
    var post_data = {
      "name": this.addNewService.get('name')?.value,
      "price": this.addNewService.get('price')?.value,
      "time": this.addNewService.get('time')?.value
    };
    this.service.addOffer(post_data).subscribe(res => {
      if(res == 'Successfully added offer.'){
        this.service.setMessage('Successfully added offer.'); //wysłanie daty do main
        this.router.navigate(['editDelService']);
      }
      else
        this.infoAlert('danger-alert-critical');
    });
  }

  infoAlert(id: string) {
    document.getElementById(id)!.style.display = 'block';
    setTimeout(() => {
        document.getElementById(id)!.style.display = 'none';
    }, 3000);
  }

  logoutAdmin() {
    localStorage.setItem('token', 'null');
    this.router.navigate(['/main']);
  }
}


