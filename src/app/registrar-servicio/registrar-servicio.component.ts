import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from 'app/services/servicios.service';
import { ValidacionesService } from 'app/services/validaciones.service';
import { MarcasService } from '../services/marcas.service';
import { VehiculosService } from '../services/vehiculos.service';
import { OperariosService } from '../services/operarios.service';
import { RegistroService } from '../services/registro.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'registrar-servicio',
  templateUrl: './registrar-servicio.component.html',
  styleUrls: ['./registrar-servicio.component.css'],
  providers: [DatePipe],
})
export class RegistrarServicioComponent implements OnInit {
  formaServicios: FormGroup; 
  fechaActual: any;
  listaMarcas= [];
  listaServicios = [];
  listaVehiculos = [];
  listaOperarios =[];
  hidden: boolean = false;
  public loading = false;
  usuario: any;
  token = localStorage.getItem('TokenTifon');

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe, 
              private marcasService: MarcasService,
              private serviciosService: ServiciosService,
              private vehiculosService: VehiculosService,
              private operariosService: OperariosService,
              private registroService: RegistroService,
              private validacionesService: ValidacionesService) { }

  ngOnInit(): void {
    this.fechaActual = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const decoded: any = jwt_decode(this.token);
    this.usuario = decoded.idusuario;
    this.listarMarcas();
    this.listarServicios();
    this.listarVehiculos();
    this.listarOperarios();
    this.crearFormularioServicio();
  }
  listarMarcas(){
    this.loading = true;
    this.marcasService.listarMarcas().subscribe(res => {
    this.listaMarcas = res.marcas.filter(datos => datos.estado == true);
    this.loading = false;
    });
 }
 listarServicios(){
  this.loading = true;
  this.serviciosService.listarServicios().subscribe(res => {
  this.listaServicios = res.tipoServicios.filter(datos => datos.estado == true); 
  this.loading = false;
  });
}
listarVehiculos(){
  this.loading = true;
  this.vehiculosService.listarVehiculos().subscribe(res => {
  this.listaVehiculos = res.vehiculos.filter(datos => datos.estado == true); 
  this.loading = false;
  });
}
listarOperarios(){
  this.loading = true;
  this.operariosService.listarOperarios().subscribe(res => {
    this.listaOperarios = res.operarios.filter(datos => datos.estado == true); 
  this.loading = false;

  });
}
  crearFormularioServicio(){
    this.formaServicios = this.fb.group({
        idservicio: [''],
        fecha: [this.fechaActual, Validators.required],
        idmarca: ['', Validators.required],
        placa:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        idtiposervicio: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        idtipovehiculo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        idusuario: [this.usuario],
        color: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        idoperario: ['', Validators.required],
        masomenos: ['na'],
        valormasomenos: ['0'],
        observaciones: ['']
      });
      this.habilitarCampo('3');
    }
    get idmarca() {
      return this.formaServicios.get('idmarca');
    }
    get placa() {
      return this.formaServicios.get('placa');
    }
    get idtiposervicio() {
      return this.formaServicios.get('idtiposervicio');
    }
    get idtipovehiculo() {
      return this.formaServicios.get('idtipovehiculo');
    }
    get color() {
      return this.formaServicios.get('color');
    }
    get idoperario() {
      return this.formaServicios.get('idoperario');
    }
    get masomenos() {
      return this.formaServicios.get('masomenos');
    }
    get valormasomenos() {
      return this.formaServicios.get('valormasomenos');
    }
    habilitarCampo(valor: string){
      if(valor === '1' || valor === '2'){
        this.hidden = true;  
        this.valormasomenos.setValidators([Validators.required]);             
      } else {        
        this.hidden = false;
        this.valormasomenos.clearValidators();
        this.valormasomenos.setValue('0');
      }
      
      
    }
    crearEditarService(){
      if(this.formaServicios.valid){
         this.loading = true;
        this.registroService.crearRegistro(this.formaServicios.value).subscribe(res =>{
          if(res.ok){
            this.validacionesService.showNotification('top','right','success', res.message);
            this.crearFormularioServicio();
            this.loading = false;
          }
        })
      }
    }
}
