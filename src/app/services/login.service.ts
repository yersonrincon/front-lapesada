import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GestionUsuariosService } from './gestion-usuarios.service';
import { ValidacionService } from './validacion.service';
import * as _moment from 'moment';
import jwt_decode from 'jwt-decode';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loading = false;
  token = '';
  constructor(private httpClient: HttpClient,
    private router: Router,
    private ValidacionService: ValidacionService) { }
  ngOnInit() {
    this.leerToken();
  }
  loginUsuario(datos) {
    this.loading = true;
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/loginUsuario`, datos).subscribe(respuesta => {
      if (respuesta.ok) {
        localStorage.setItem('tokenlapesada', `${respuesta.token}`);
        this.ValidacionService;
        Swal.fire({
          title: 'OK',
          text: `${respuesta.message}`,
          icon: 'info'
        });
        this.router.navigateByUrl('/dashboard');
        this.loading = false;
      } else {
        this.ValidacionService;
        Swal.fire({
          title: 'Alerta!!',
          text: `${respuesta.message}`,
          icon: 'info'
        });
        this.loading = false;
      }
    });
  }
  leerToken() {
    if (localStorage.getItem('tokenlapesada')) {
      this.token = localStorage.getItem('tokenlapesada');
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
    console.log(decoded);
    var dateString = _moment.unix(decoded.exp).toDate();
    if (dateString > new Date()) {
      return true;
    } else {
      localStorage.removeItem('tokenlapesada');
      return false;
    }
  }
  signOut(): void {
    localStorage.removeItem('tokenlapesada');
    this.router.navigateByUrl('/demoPages/login');
  }
}