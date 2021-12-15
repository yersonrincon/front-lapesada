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
  listaRoles: [];
  estadoBoton: boolean = true;
  public loading = false;

  constructor(private fb: FormBuilder,
              private validacionesService: ValidacionesService,
              private usuariosService: UsuariosService
    ) {
    
   }

  ngOnInit() {
    this.crearFormularioUsuarios('');
    this.listarUsuarios();
    this.listarRoles();
  }
  listarUsuarios(){
      this.loading = true;
      this.usuariosService.listarUsuarios().subscribe(res => {
      this.listaUsuarios = res.usuarios;
      this.loading = false;

     });
  }
  listarRoles(){
    this.usuariosService.listarRoles().subscribe(res => {
    this.listaRoles = res.roles;
   });
}
  crearFormularioUsuarios(datos){
    this.estadoBoton = datos ? false: true;
    this.formaUsuarios = this.fb.group({
        idusuario: [ datos.idusuario? datos.idusuario:''],
        nombre: [ datos.nombre? datos.nombre:'', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        usuario: [ datos.usuario? datos.usuario:'', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
        rol: [datos.idrol? datos.idrol:'', [Validators.required]],
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
    get rol() {
      return this.formaUsuarios.get('rol');
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
        this.loading = true;
        if(this.estadoBoton){
          this.usuariosService.crearUsuario(this.formaUsuarios.value).subscribe(res =>{
            if(res.ok){
              this.validacionesService.showNotification('top','right','success', res.message);
              this.listarUsuarios();
              this.crearFormularioUsuarios('');
              this.loading = false;
            } else {
              this.validacionesService.showNotification('top','right','warning', res.message);
              this.loading = false;
            }
          });
        } else {
          this.usuariosService.editarUsuario(this.formaUsuarios.value).subscribe(res =>{
            if(res.ok){
              this.validacionesService.showNotification('top','right','success', res.message);
              this.listarUsuarios();
              this.loading = false;
            }           
          });
        }
        
      }
    }
    cambiarEstado(datos){
    this.loading = true;
    const datosUser ={
    idusuario: datos.idusuario,
    estado: datos.estado? false: true
    }
    this.usuariosService.actualizarEstadoUsuario(datosUser).subscribe(res =>{
      if(res.ok){
        this.validacionesService.showNotification('top','right','success', res.message);
        this.listarUsuarios();
        this.loading = false;
      }
    })
    }
    editarUsario(datos){
    this.crearFormularioUsuarios(datos);
    this.estadoBoton = false;
    }
}
