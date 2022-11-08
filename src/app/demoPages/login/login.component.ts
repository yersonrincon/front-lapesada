import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'app/services/login.service';
//import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';
//import { ValidacionService } from 'app/services/validacion.service';
import Swal from 'sweetalert2';
import { SocialAuthService } from "angularx-social-login";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import { Router } from '@angular/router';
import { SocialUser } from "angularx-social-login";
import { LoginGoogleService } from 'app/services/login-goole.service';



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  loginForma!: FormGroup;
  show:boolean = true;
  user: SocialUser;

  loggedIn: boolean;
  ventanaModal!: BsModalRef<any>;
hide = true;
  listausuarios:any;
    constructor(
      private loginGoogle: LoginGoogleService,
      private fb: FormBuilder,
      private modalService: BsModalService,
      private loginService: LoginService,
      private authGoogle: SocialAuthService, 
      private router: Router, 
      private authService: SocialAuthService,
     
    //  private gestionUsuarioService: GestionUsuariosService,
  //  private validador: ValidacionService,
      ) { }

      ngOnInit() {

        this.authService.authState.subscribe((user) => {
          this.user = user;
          this.loggedIn = (user != null);
        });
      }
    
      openModalEliminarRegistro(templateEliminarRegistro: TemplateRef<any>) {
   
        this.ventanaModal = this.modalService.show(templateEliminarRegistro, { class: 'modal-lg' });
        this.ventanaModal.hide();
      }
      signInWithGoogle(): void {
        this.authGoogle.signIn(GoogleLoginProvider.PROVIDER_ID).then(respuesta =>{
          if(respuesta){
          console.log(respuesta)
          this.loginGmail(respuesta.email, respuesta.id);
          }
        })
      }
      loginGmail(correoConsulta, id){
        this.loginGoogle.validarCorreoGmail(correoConsulta, id).subscribe(respuesta => {
          if (respuesta.ok ===false) {
            Swal.fire({ 
              title: 'Alerta!!',
              text: `${respuesta.message}`,
              icon: 'info'
            });
            this.signOut();
            localStorage.removeItem('tokenlapesada');
            this.router.navigateByUrl('/demoPages/login'); 

          } else if (respuesta.ok === true) {
            this.loginGoogle.loginUsuario(correoConsulta);
          }
        })
      }

      signOut(): void {
        this.authGoogle.signOut();
      }


/* loginUsuario(){
    console.log(this.loginForma);
    if(this.loginForma.valid){
      console.log(this.loginForma.value)
 
      this.gestionUsuarioService.loginUsuario(this.loginForma.value).subscribe(respuesta=>{
        console.log(respuesta);
        
        if(respuesta.ok === true){
          Swal.fire(
            'login!',
            `${respuesta.message}`,
            'success'
          );
          this.route.navigateByUrl('/dashboard');
        } else {
          Swal.fire(
            'login!',
            `${respuesta.message}`,
            'error'
          );
        }
        
      })
    }
}*/


}
