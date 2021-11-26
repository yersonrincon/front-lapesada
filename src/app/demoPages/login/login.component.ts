import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

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
        this.loading = true;
        this.loginService.loginUsuario(this.formaUsuario.value);
      }
    }
    cerrarSesion(){
      this.loginService.signOut();
    }
}
