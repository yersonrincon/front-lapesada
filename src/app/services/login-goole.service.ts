import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ValidacionService } from './validacion.service';
import { ComponentsModule } from 'app/components/components.module';


@Injectable({
  providedIn: 'root'
})
export class LoginGoogleService {
    public loading = false;
    token ='';
  constructor(
              private authGoogle: SocialAuthService,
              private router: Router, 
              private ValidacionService: ValidacionService,
              private httpClient: HttpClient) { }

  datos: SocialUser;
  loggedIn: boolean;


  ngOnInit() {
    this.leerToken();    
  
  }
  
  

  validarCorreoGmail(email: any, id: any) {
    const user = { email, id };
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/validarCorreoGmail`, user);
  }

  
  
           loginUsuario(datos){
            this.loading = true;
            return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/loginUsuario`,{datos}).subscribe( respuesta =>{
                
             console.log('datos consulta', respuesta)
               
                    if(respuesta.ok === true){
                      localStorage.setItem('tokenlapesada', `${respuesta.token}`);
                   
                      this.ValidacionService.showNotification('top','right','success', respuesta.message);
                      if(respuesta.roles === 1 || respuesta.roles === 2){
                       this.router.navigateByUrl('/dashboard');                   
                      }
                      if(respuesta.roles === 3){
                        this.router.navigateByUrl('/ver-tienda');                   
                       }
                      this.loading = false;
                    } else {
                      this.ValidacionService.showNotification('top','right','danger', respuesta.message);
                      this.loading = false;
                    }       
              
                  });
                 }  
                 
           
         /*
           login(email: any, id: any) {
            const headers = new HttpHeaders({
               // 'apiKeyToken':  environment.PUBLIC_API_KEY_TOKEN_COMMON
              });
            const data = {
                username: email,
                password: id
              };
            return this.httpClient.post<any>(`${environment.apiUrl}/api/auth/sign-in`, data, {headers})
              .pipe(map(respuesta => respuesta)).subscribe((respuesta: any)  => {
                if (respuesta.token) {
                    localStorage.setItem('Token', `Bearer ${respuesta.token}`);
                    this.getdatosGmail();
                    this.route.navigateByUrl('/home/home');
                    } else {
                        //console.log('no token');
                    }
                });
        }
          */
        leerToken() {
          if (localStorage.getItem('tokenlapesada')) {
            this.token = localStorage.getItem('tokenlapesada');
          } else {
            this.token = '';
          }
        }
signOut(): void {
    localStorage.removeItem('tokenlapesada');
    this.router.navigateByUrl('/demoPages/login');  
}
}