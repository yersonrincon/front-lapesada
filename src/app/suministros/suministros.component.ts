import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuministrosService } from '../services/suministros.service';
import { ValidacionesService } from '../services/validaciones.service';

@Component({
  selector: 'suministros',
  templateUrl: './suministros.component.html',
  styleUrls: ['./suministros.component.css']
})
export class SuministrosComponent implements OnInit {

  formaSuministro: FormGroup; 
  listaSuministros: [];
  estadoBoton: boolean = true;
  public loading = false;

  constructor(private fb: FormBuilder,
              private suministrosService: SuministrosService,
              private validacionesService: ValidacionesService
              ) { }

  ngOnInit(): void {
    this.crearFormularioSuministros('');
    this.listarSuministros();
  }
  listarSuministros(){
    this.loading = true;
    this.suministrosService.listarSuministro().subscribe(res => {
    this.listaSuministros = res.suministros;
    this.loading = false;

    });
 }
 crearFormularioSuministros(datos){
  this.estadoBoton = datos ? false: true;
  this.formaSuministro = this.fb.group({
      idsuministro: [ datos.idsuministro? datos.idsuministro:''],
      nombre: [ datos.nombre? datos.nombre:'', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      valor: [ datos.valor? datos.valor:'', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      estado: [datos.estado]
    });
  }
  get nombre() {
    return this.formaSuministro.get('nombre');
  }
  get valor() {
    return this.formaSuministro.get('valor');
  }
  crearEditarSuministro(){
    if(this.formaSuministro.valid){
    this.loading = true;
      if(this.estadoBoton){
        this.suministrosService.crearSuministro(this.formaSuministro.value).subscribe(res =>{
          if(res.ok){
            this.validacionesService.showNotification('top','right','success', res.message);
            this.listarSuministros();
            this.crearFormularioSuministros('');
            this.loading = false;
          } else {
            this.validacionesService.showNotification('top','right','warning', res.message);
            this.loading = false;
          }
        });
      } else {
        this.suministrosService.editarSuministro(this.formaSuministro.value).subscribe(res =>{
          if(res.ok){
            this.validacionesService.showNotification('top','right','success', res.message);
            this.listarSuministros();
            this.loading = false;
          }           
        });
      }
      
    }
  }  
  cambiarEstado(datos){
    this.loading = true;
    const datosUser ={
    idsuministro: datos.idsuministro,
    estado: datos.estado? false: true
    }
    this.suministrosService.actualizarEstadoSuministro(datosUser).subscribe(res =>{
      if(res.ok){
        this.validacionesService.showNotification('top','right','success', res.message);
        this.listarSuministros();
        this.loading = false;
      }
    })
    }
    editarSuministro(datos){
    this.crearFormularioSuministros(datos);
    this.estadoBoton = false;
    }

}
