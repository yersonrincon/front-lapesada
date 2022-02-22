import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ValidacionesService } from './validaciones.service';
import { map } from 'rxjs/operators';
import * as _moment from 'moment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loading = false;
   token ='';
  constructor(private httpClient: HttpClient,
              private router: Router,
              private validacionesService: ValidacionesService) { }

  ngOnInit() {
    this.leerToken();    
  }
  
  loginUsuario(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonUsuarios/loginUsuario`,datos)
   .pipe(
    map( respuesta =>{
      if(respuesta.ok){
      localStorage.setItem('TokenTifon', `Bearer ${respuesta.token}`);
      this.token = respuesta.token;
      }
      return respuesta;
    })
  );
}
  /*loginUsuario(datos){
    this.loading = true;
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonUsuarios/loginUsuario`,datos).subscribe( res =>{
      if(res.ok){
        localStorage.setItem('TokenTifon', `Bearer ${res.token}`);
        this.token = res.token;
        this.validacionesService.showNotification('top','right','success', res.message);
        this.router.navigateByUrl('/inicio');
        this.loading = false;
      } else {
        this.validacionesService.showNotification('top','right','danger', res.message);
        this.loading = false;
      }       

    });
   }*/
   leerToken() {
    if (localStorage.getItem('TokenTifon')) {
      this.token = localStorage.getItem('TokenTifon');
    } else {
      this.token = '';
    }
  }
  estaAutenticado(): boolean {
    this.leerToken();
    if (!this.token || this.token.length < 2) {
      return false;
    }   
    const decoded: any = jwt_decode(this.token);

    var dateString = _moment.unix(decoded.exp).toDate();
    if (dateString > new Date()) {
      return true;
    } else {
      localStorage.removeItem('TokenTifon');
      return false;
    }
  }
  signOut(): void {
    localStorage.removeItem('TokenTifon');
    this.router.navigateByUrl('/demoPages/login');  
}
}
