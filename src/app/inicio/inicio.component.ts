import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RegistroService } from '../services/registro.service';
import { OperariosService } from '../services/operarios.service';
import { ValidacionesService } from '../services/validaciones.service';

@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [DatePipe],

})
export class InicioComponent implements OnInit {
  public loading = false;
  servicioOperarios = [];
  fechaActual: any;
  totalserviciosDia = [];
  ventanaModal: BsModalRef;
  formaOperarios: FormGroup;
  listaOperarios =[];
  formaEstado: FormGroup; 
  listaEstados = [];
  style1 =false;
  style2 = false;
  tituloModal: string;
  serviciosBusqueda = [];
  mensaje: string ='Buen día,☀️';
  mensaje1: string =' nos comunicamos del autolavado MONSTER para informarle que su vehículo🚗🏍️🚛 ya se encuentra listo ✔️. Tambien le informamos que contamos con parqueadero 🏁 nocturno 🌚';

  constructor(
    private registroService: RegistroService,
    private datePipe: DatePipe,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private operariosService: OperariosService,
    private validacionesService: ValidacionesService,

  ) { }

  ngOnInit(): void {
    this.fechaActual = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.consultarServiciosOperarios();
    this.serviciosDia(this.fechaActual,this.fechaActual);
    this.listarEstados();

  }
  consultarServiciosOperarios(){
    this.loading = true;
    this.registroService.consultarServiciosOperarios(this.fechaActual).subscribe(res =>{
    this.servicioOperarios = res.servicioOperarios;
    this.loading = false;
    });
  }
  serviciosDia(fechaInicial,fechaFinal){
    this.loading = true;
    this.registroService.serviciosDia(fechaInicial,fechaFinal).subscribe(res =>{
    this.totalserviciosDia = res.serviciosDia;
    this.loading = false;
  });
  }
  openModalCambiarOperario(templateOperarios: TemplateRef<any>, datos) { 
    this.crearFormularioOperarios(datos);
    this.listarOperarios();
    this.ventanaModal = this.modalService.show(templateOperarios);
    this.ventanaModal.setClass('modal-md');
  }
  crearFormularioOperarios(datos){
    this.formaOperarios = this.fb.group({
        idservicio: [datos.idservicio],
        idoperario:['',[Validators.required]]
      });
    }
    get idoperario() {
      return this.formaOperarios.get('idoperario');
    }
    listarOperarios(){
      this.loading = true;
      this.operariosService.listarOperarios().subscribe(res => {
      this.listaOperarios = res.operarios.filter(datos => datos.estado == true); 
      this.loading = false;
    
      });
    }
    actualizarOperario(){
      if(this.formaOperarios.valid){
        this.loading =true;
        this.registroService.actualizarOperarioServicio(this.formaOperarios.value).subscribe( res =>{
        if(res.ok){
        this.closeVentana();
        this.validacionesService.showNotification('top','right','success', res.message);
        this.ngOnInit();
        this.loading = false;
        }
        });
      }
    }
    actualizarEstado(){
      if(this.formaEstado.valid){
         this.loading = true;
         this.registroService.cambiarEstadoServicio(this.formaEstado.value).subscribe(res =>{
       
       if(res.ok){
         this.closeVentana();
         this.validacionesService.showNotification('top','right','success', res.message);
         this.ngOnInit();
         this.loading = false;
       }
     })
      }
      }
      listarEstados(){
        this.registroService.listarEstados().subscribe(res => {
        this.listaEstados = res.listaEstados;
      });
   }
   openModalCambiarEstado(templateCambiarEstado: TemplateRef<any>, datos) { 
    this.crearFormularioEstado(datos);
    this.ventanaModal = this.modalService.show(templateCambiarEstado);
    this.ventanaModal.setClass('modal-md');
    }
   crearFormularioEstado(datos){
    this.formaEstado = this.fb.group({
        idservicio:[datos.idservicio],
        idestado: ['', [Validators.required]],
        observaciones: ['']
      });
    }
    get idestado() {
      return this.formaEstado.get('idestado');
    }
    openModalFinalizados(templateFinalizados: TemplateRef<any>, tipo, operario){
      this.serviciosBusqueda = []; 
     if(tipo ==='F'){
       this.buscarFinalizadosOperario(this.fechaActual,operario);
       this.tituloModal ='finalizados';
       this.style1 =true;
       this.style2 = false;
     }else if(tipo ==='P'){
       this.buscarProcesosOperario(this.fechaActual,operario);
       this.tituloModal ='en proceso';
       this.style1 =false;
       this.style2 = true;
     } else if(tipo ==='C'){
       this.tituloModal ='cancelados';
       this.style1 = false;
       this.style2 = false;
       this.buscarCanceladosOperario(this.fechaActual,operario);
     }
     this.ventanaModal = this.modalService.show(templateFinalizados);
     this.ventanaModal.setClass('modal-lg');
   }
   buscarFinalizadosOperario(fechaIncio,operario){
    this.registroService.buscarFinalizadosOperario(fechaIncio,operario).subscribe(res =>{
      this.serviciosBusqueda = res.serviciosFinalizados;
    });
  }
  buscarProcesosOperario(fechaIncio,operario){
    this.registroService.buscarProcesosOperario(fechaIncio,operario).subscribe(res =>{
      this.serviciosBusqueda = res.serviciosEnProceso;
    });
  }
  buscarCanceladosOperario(fechaIncio,operario){
    this.registroService.buscarCanceladosOperario(fechaIncio,operario).subscribe(res =>{
      this.serviciosBusqueda = res.serviciosCancelados;
    });
  }
    closeVentana(): void {
      this.ventanaModal.hide();
    }
}
