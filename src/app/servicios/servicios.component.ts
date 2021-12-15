import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from 'app/services/servicios.service';
import { ValidacionesService } from '../services/validaciones.service';

@Component({
  selector: 'servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  formaServicios: FormGroup; 
  listaServicios: [];
  estadoBoton: boolean = true;
  public loading = false;

  constructor(private fb: FormBuilder,
              private serviciosService: ServiciosService,
              private validacionesService: ValidacionesService
              ) { }

  ngOnInit(): void {
    this.crearFormularioServicio('');
    this.listarServicios();
  }
  listarServicios(){
    this.loading = true;
    this.serviciosService.listarServicios().subscribe(res => {
      this.listaServicios = res.tipoServicios;
    this.loading = false;
    });
 }
 crearFormularioServicio(datos){
  this.estadoBoton = datos ? false: true;
  this.formaServicios = this.fb.group({
      idtiposervicio: [ datos.idtiposervicio? datos.idtiposervicio:''],
      nombreservicio: [ datos.nombreservicio? datos.nombreservicio:'', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      valor: [ datos.valor? datos.valor:'', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      estado: [datos.estado]
    });
  }
  get nombreServicio() {
    return this.formaServicios.get('nombreservicio');
  }
  get valor() {
    return this.formaServicios.get('valor');
  }
  crearEditarServicio(){
    if(this.formaServicios.valid){
      if(this.estadoBoton){
        this.serviciosService.crearServicio(this.formaServicios.value).subscribe(res =>{
          if(res.ok){
            this.validacionesService.showNotification('top','right','success', res.message);
            this.listarServicios();
            this.crearFormularioServicio('');
          } else {
            this.validacionesService.showNotification('top','right','warning', res.message);
          }
        });
      } else {
        this.serviciosService.editarServicio(this.formaServicios.value).subscribe(res =>{
          if(res.ok){
            this.validacionesService.showNotification('top','right','success', res.message);
            this.listarServicios();
          }           
        });
      }
      
    }
  }  
  cambiarEstado(datos){
    const datosUser ={
    idtiposervicio: datos.idtiposervicio,
    estado: datos.estado? false: true
    }
    this.serviciosService.actualizarEstadoServicio(datosUser).subscribe(res =>{
      if(res.ok){
        this.validacionesService.showNotification('top','right','success', res.message);
        this.listarServicios();
      }
    })
    }
    editarServicio(datos){
    this.crearFormularioServicio(datos);
    this.estadoBoton = false;
    }
 
}
