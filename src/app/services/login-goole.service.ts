import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ValidacionService } from './validacion.service';
import { ComponentsModule } from 'app/components/components.module';
import Swal from 'sweetalert2';


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
                      
                      this.ValidacionService;
                      Swal.fire({
                        
                        title: 'login exitoso',
                        text: `${respuesta.message}`,
                        icon:  'success'
                      });
                      if(respuesta.roles === 1 || respuesta.roles === 2){
                       
                        this.getdatosGmail();
                       this.router.navigateByUrl('/dashboard');                   
                      }
                      if(respuesta.roles === 3){
                        this.getdatosGmail();
                        this.router.navigateByUrl('/productos-cliente');                   
                       }
                      this.loading = false;
                    } else {
                      this.ValidacionService;
                   Swal.fire({
                        
                    title: 'Alerta!!',
                    text: `${respuesta.message}`,
                    icon:  'error'
                  });
                      this.loading = false;
                    }       
              
                  });
                 }  
                 getdatosGmail() {
                  this.authGoogle.authState.subscribe((user) => {
                   this.datos = user;
                   this.loggedIn = (user != null);
                 }); 
                 let datosGoogle = {email: this.datos.email, photoUrl: this.datos.photoUrl, name: this.datos.name};  
                 localStorage.setItem('TokenGoogle', `${JSON.stringify(datosGoogle)}`);
                 return this.datos;
               }
           
         
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