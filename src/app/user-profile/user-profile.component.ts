import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'app/services/usuarios.service';
import { ValidacionesService } from 'app/services/validaciones.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  formaUsuarios: FormGroup; 
  listaUsuarios: [];
  estadoBoton: boolean = true;
  constructor(
              private fb: FormBuilder,
              private validacionesService: ValidacionesService,
              private usuariosService: UsuariosService
    ) {
    
   }

  ngOnInit() {
    this.crearFormularioUsuarios('');
    this.listarUsuarios();
  }
  listarUsuarios(){
     this.usuariosService.listarUsuarios().subscribe(res => {
       this.listaUsuarios = res.usuarios;
      console.log(res);
     });
  }
  crearFormularioUsuarios(datos){
    this.estadoBoton = datos ? false: true;
    this.formaUsuarios = this.fb.group({
        idusuario: [ datos.idusuario? datos.idusuario:''],
        nombre: [ datos.nombre? datos.nombre:'', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        usuario: [ datos.usuario? datos.usuario:'', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
        clave: [datos.clave? datos.clave:'', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
        clave2: [datos.clave? datos.clave:'', [Validators.required]],
        estado: [datos.estado]
      });
    }
    get nombre() {
      return this.formaUsuarios.get('nombre');
    }    
    get usuario() {
      return this.formaUsuarios.get('usuario');
    }
    get clave() {
      return this.formaUsuarios.get('clave');
    }
    get clave2() {
      return this.formaUsuarios.get('clave2');
    }
    get passw2NoValido() {
      const pass1 = this.formaUsuarios.get('clave').value;
      const pass2 = this.formaUsuarios.get('clave2').value;
      return (pass1 === pass2)? false: true;
    }
    crearEditarUsuario(){
      if(this.formaUsuarios.valid){
        if(this.estadoBoton){
          this.usuariosService.crearUsuario(this.formaUsuarios.value).subscribe(res =>{
            console.log(res);
            if(res.ok){
              this.validacionesService.showNotification('top','right','success', res.message);
              this.listarUsuarios();
              this.crearFormularioUsuarios('');
            } else {
              this.validacionesService.showNotification('top','right','warning', res.message);
            }
          });
        } else {
          this.usuariosService.editarUsuario(this.formaUsuarios.value).subscribe(res =>{
            console.log(res);
            if(res.ok){
              this.validacionesService.showNotification('top','right','success', res.message);
              this.listarUsuarios();
            }           
          });
        }
        
      }
    }
    cambiarEstado(datos){
    const datosUser ={
    idusuario: datos.idusuario,
    estado: datos.estado? false: true
    }
    this.usuariosService.actualizarEstadoUsuario(datosUser).subscribe(res =>{
      console.log(res);
      if(res.ok){
        this.validacionesService.showNotification('top','right','success', res.message);
        this.listarUsuarios();
      }
    })
    }
    editarUsario(datos){
    this.crearFormularioUsuarios(datos);
    this.estadoBoton = false;
    }
}
