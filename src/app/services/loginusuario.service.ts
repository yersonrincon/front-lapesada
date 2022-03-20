import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GestionUsuariosService } from './gestion-usuarios.service';
import { ValidacionService } from './validacion.service';
import * as _moment from 'moment';
import jwt_decode from 'jwt-decode';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';


@Injectable({
    providedIn: 'root'
  })
  export class LoginUsuarioService {
    public loading = false;
    token ='';
    constructor(private httpClient: HttpClient,
                private router: Router,
                private ValidacionService: ValidacionService) { }
                ngOnInit() {
                  this.leerToken();    
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
        
            }
             
        
        }