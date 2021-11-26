import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from 'app/services/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GuardGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService ){}
  canActivate(): boolean {
    if (this.loginService.estaAutenticado()) {
       return true;
     } else {
       this.router.navigateByUrl('/demoPages/login');
       return false;
     }
     }
  
}
