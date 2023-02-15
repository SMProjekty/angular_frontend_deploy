import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  admin_password: String = '';

  constructor(private router: Router) {}

  checkPassword(pass: String) {
    this.admin_password = '';
    if (pass === 'qwe123') {
      localStorage.setItem('token', '-DIM7FRNnqLFqkgGICNN=vi7F5e=9ptuHFx8NLadvuy/PYV2mxC996/xB-ACNrVamusWZtbsFIsNiN0!Fikv7ezL1E5rBSAyiHP2f5ApLZR63Rryg--PdLoH=Y5lqUkY');
      this.router.navigate(['editDelService']);
    }
    else
      console.log('wrong password');
  }
}
