import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ValidacionesService } from '../../services/validaciones.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loading = false;
  hide = true;
  formaUsuario: FormGroup;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private validacionesService: ValidacionesService,
              private router: Router,
              private spinner: NgxSpinnerService,
              ) { }
  
  ngOnInit(): void {
    this.cerrarSesion();
    this.crearFormularioEstado();
  }
  crearFormularioEstado(){
    this.formaUsuario = this.fb.group({
        usuario: ['', [Validators.required]],
        clave: ['',[Validators.required]]
      });
    }
    get usuario() {
      return this.formaUsuario.get('usuario');
    }
    get clave() {
      return this.formaUsuario.get('clave');
    }
    login(){
      if(this.formaUsuario.valid){  
        this.spinner.show();    
        this.loginService.loginUsuario(this.formaUsuario.value).subscribe(res =>{
          if(res.ok){            
            this.validacionesService.showNotification('top','right','success', res.message);
            this.router.navigateByUrl('/inicio');
            this.spinner.hide();
          } else {
            this.validacionesService.showNotification('top','right','danger', res.message);
            this.spinner.hide();
          } 
        });
       
      }
    }
    cerrarSesion(){
      this.loginService.signOut();
    }
}
