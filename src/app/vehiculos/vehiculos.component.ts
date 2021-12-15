import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidacionesService } from '../services/validaciones.service';
import { VehiculosService } from '../services/vehiculos.service';

@Component({
  selector: 'vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

  formaVehiculo: FormGroup; 
  listaVehiculos: [];
  estadoBoton: boolean = true;
  public loading = false;

  constructor(private fb: FormBuilder,
              private vehiculosService: VehiculosService,
              private validacionesService: ValidacionesService
              ) { }

  ngOnInit(): void {
    this.crearFormularioVehiculos('');
    this.listarVehiculos();
  }
  listarVehiculos(){
    this.loading = true;
    this.vehiculosService.listarVehiculos().subscribe(res => {
    this.listaVehiculos = res.vehiculos;
    this.loading = false;

    });
 }
 crearFormularioVehiculos(datos){
  this.estadoBoton = datos ? false: true;
  this.formaVehiculo = this.fb.group({
      idtipovehiculo: [ datos.idtipovehiculo? datos.idtipovehiculo:''],
      nombrevehiculo: [ datos.nombrevehiculo? datos.nombrevehiculo:'', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      estado: [datos.estado]
    });
  }
  get nombrevehiculo() {
    return this.formaVehiculo.get('nombrevehiculo');
  }
  crearEditarVehiculo(){
    if(this.formaVehiculo.valid){
    this.loading = true;
      if(this.estadoBoton){
        this.vehiculosService.crearVehiculo(this.formaVehiculo.value).subscribe(res =>{
          if(res.ok){
            this.validacionesService.showNotification('top','right','success', res.message);
            this.listarVehiculos();
            this.crearFormularioVehiculos('');
            this.loading = false;
          } else {
            this.validacionesService.showNotification('top','right','warning', res.message);
            this.loading = false;
          }
        });
      } else {
        this.vehiculosService.editarVehiculo(this.formaVehiculo.value).subscribe(res =>{
          if(res.ok){
            this.validacionesService.showNotification('top','right','success', res.message);
            this.listarVehiculos();
            this.loading = false;
          }           
        });
      }
      
    }
  }  
  cambiarEstado(datos){
    this.loading = true;
    const datosUser ={
    idtipovehiculo: datos.idtipovehiculo,
    estado: datos.estado? false: true
    }
    this.vehiculosService.actualizarEstadoVehiculo(datosUser).subscribe(res =>{
      if(res.ok){
        this.validacionesService.showNotification('top','right','success', res.message);
        this.listarVehiculos();
        this.loading = false;
      }
    })
    }
    editarVehiculo(datos){
    this.crearFormularioVehiculos(datos);
    this.estadoBoton = false;
    }

}
