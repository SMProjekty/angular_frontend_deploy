import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private route: Router) {}

  canActivate() {
    if (this.auth.checkAdminToken()) {
      return true;
    } else {
      this.route.navigate(['/adminLogin']);
      return false;
    }
  }
  
}
