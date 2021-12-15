import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OperariosService } from 'app/services/operarios.service';
import { ValidacionesService } from 'app/services/validaciones.service';

@Component({
  selector: 'operarios',
  templateUrl: './operarios.component.html',
  styleUrls: ['./operarios.component.css']
})
export class OperariosComponent implements OnInit {

  formaOperario: FormGroup; 
  listaOperarios: [];
  estadoBoton: boolean = true;
  public loading = false;

  constructor(private fb: FormBuilder,
              private operariosService: OperariosService,
              private validacionesService: ValidacionesService
              ) { }

  ngOnInit(): void {
    this.crearFormularioOperarios('');
    this.listarOperarios();
  }
  listarOperarios(){
    this.loading = true;
    this.operariosService.listarOperarios().subscribe(res => {
    this.listaOperarios = res.operarios;
    this.loading = false;
    });
 }
 crearFormularioOperarios(datos){
  this.estadoBoton = datos ? false: true;
  this.formaOperario = this.fb.group({
      idoperario: [ datos.idoperario? datos.idoperario:''],
      nombre: [ datos.nombre? datos.nombre:'', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      documento: [ datos.documento? datos.documento:'', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      telefono: [ datos.telefono? datos.telefono:'', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      direccion: [ datos.direccion? datos.direccion:'', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      estado: [datos.estado]
    });
  }
  get nombre() {
    return this.formaOperario.get('nombre');
  }
  get documento() {
    return this.formaOperario.get('documento');
  }
  get telefono() {
    return this.formaOperario.get('telefono');
  }
  get direccion() {
    return this.formaOperario.get('direccion');
  }
  crearEditarOperario(){
    if(this.formaOperario.valid){
    this.loading = true;
      if(this.estadoBoton){
        this.operariosService.crearOperario(this.formaOperario.value).subscribe(res =>{
          if(res.ok){
            this.validacionesService.showNotification('top','right','success', res.message);
            this.listarOperarios();
            this.crearFormularioOperarios('');
            this.loading = false;
          } else {
            this.validacionesService.showNotification('top','right','warning', res.message);
            this.loading = false;
          }
        });
      } else {
        this.operariosService.editarOperario(this.formaOperario.value).subscribe(res =>{
          if(res.ok){
            this.validacionesService.showNotification('top','right','success', res.message);
            this.listarOperarios();
            this.loading = false;
          }           
        });
      }
      
    }
  }  
  cambiarEstado(datos){
    this.loading = true;
    const datosUser ={
      idoperario: datos.idoperario,
    estado: datos.estado? false: true
    }
    this.operariosService.actualizarEstadoOperario(datosUser).subscribe(res =>{
      if(res.ok){
        this.validacionesService.showNotification('top','right','success', res.message);
        this.listarOperarios();
        this.loading = false;
      }
    })
    }
    editarOperario(datos){
    this.crearFormularioOperarios(datos);
    this.estadoBoton = false;
    }
 

}
