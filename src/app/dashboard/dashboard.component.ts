import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { RegistroService } from 'app/services/registro.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ValidacionesService } from '../services/validaciones.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { OperariosService } from '../services/operarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe],
})

export class DashboardComponent implements OnInit {
  fechaActual: any;
  listaRegistros= [];
  listaEstados = [];
  serviciosBusqueda = [];
  totalFinalizados: any;
  totalEnProceso: any;
  totalCancelados: any;
  totalserviciosDia: any;
  valorTotalFinalizados: any;
  totales: any;
  totalP: any;
  ventanaModal: BsModalRef;
  formaEstado: FormGroup; 
  formaFechas: FormGroup;
  public loading = false;
  style1 =false;
  style2 = false;
  tituloModal: string;
  mensaje: string ='Buen día,☀️';
  mensaje1: string =' nos comunicamos del autolavado MONSTER para informarle que su vehículo🚗🏍️🚛 ya se encuentra listo ✔️. Tambien le informamos que contamos con parqueadero 🏁 nocturno 🌚';
  constructor(private registroService: RegistroService,
              private modalService: BsModalService,
              private fb: FormBuilder,
              private validacionesService: ValidacionesService,
              private datePipe: DatePipe) { }

  ngOnInit(): void { 
    
      this.fechaActual = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.crearFormularioFechas();     
      this.consultarFinalizados(this.fechaActual,this.fechaActual);
      this.consultarEnproceso(this.fechaActual,this.fechaActual);
      this.consultarCancelados(this.fechaActual,this.fechaActual);
      this.consultarTotales(this.fechaActual,this.fechaActual);
      this.serviciosDia(this.fechaActual,this.fechaActual);
      this.listarEstados();
     

  }
//////////////////////////////////////


consultarFinalizados(fechaInicial,fechaFinal){
  this.loading = true;
  this.registroService.consultarFinalizados(fechaInicial,fechaFinal).subscribe(res =>{
  this.totalFinalizados = res.finalizados.finalizados;  
  this.loading = false;
  });
}
consultarEnproceso(fechaInicial,fechaFinal){
  this.loading = true;
  this.registroService.consultarEnproceso(fechaInicial,fechaFinal).subscribe(res =>{
  this.totalEnProceso = res.proceso.proceso;
  this.loading = false;
  });
}
consultarCancelados(fechaInicial,fechaFinal){
  this.loading = true;
  this.registroService.consultarCancelados(fechaInicial,fechaFinal).subscribe(res =>{
  this.totalCancelados = res.cancelados.cancelados;
  this.loading = false;
  });
}
consultarTotales(fechaInicial,fechaFinal){
  this.loading = true;
  this.registroService.consultarTotales(fechaInicial,fechaFinal).subscribe(res =>{
  this.totales = res; 
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
  listarEstados(){
      this.registroService.listarEstados().subscribe(res => {
      this.listaEstados = res.listaEstados;
    });
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
 crearFormularioFechas(){
  this.formaFechas = this.fb.group({
      fechaInicial:['', [Validators.required]],
      fechaFinal: ['', [Validators.required]]
    });
  }
  get fechaInicial() {
    return this.formaFechas.get('fechaInicial');
  }
  get fechaFinal() {
    return this.formaFechas.get('fechaFinal');
  }
  buscarR(){
    if(this.formaFechas.valid){
    const fechaIncio =moment(this.formaFechas.value.fechaInicial).format('YYYY-MM-DD');
    const fechaFin = moment(this.formaFechas.value.fechaFinal).format('YYYY-MM-DD');
    this.buscarFinalizados(fechaIncio,fechaFin);
    this.buscarProcesos(fechaIncio,fechaFin);
    this.consultarFinalizados(fechaIncio,fechaFin);
    this.consultarEnproceso(fechaIncio,fechaFin);
    this.consultarCancelados(fechaIncio,fechaFin);
    this.consultarTotales(fechaIncio,fechaFin);
    this.serviciosDia(fechaIncio,fechaFin);
    }
    
  }
  openModalFinalizados(templateFinalizados: TemplateRef<any>, tipo){
     let fechaI ='';
     let fechaF ='';
     this.formaFechas.value.fechaInicial==='' && this.formaFechas.value.fechaFinal===''? fechaI = moment(this.fechaActual).format('YYYY-MM-DD'): fechaI = moment(this.formaFechas.value.fechaInicial).format('YYYY-MM-DD');
     this.formaFechas.value.fechaInicial==='' && this.formaFechas.value.fechaInicial===''? fechaF = moment(this.fechaActual).format('YYYY-MM-DD'): fechaF = moment(this.formaFechas.value.fechaFinal).format('YYYY-MM-DD');

    if(tipo ==='F'){
      this.buscarFinalizados(fechaI,fechaF);
      this.tituloModal ='finalizados';
      this.style1 =true;
      this.style2 = false;
    }else if(tipo ==='P'){
      this.buscarProcesos(fechaI,fechaF);
      this.tituloModal ='en proceso';
      this.style1 =false;
      this.style2 = true;
    } else if(tipo ==='C'){
      this.tituloModal ='cancelados';
      this.style1 = false;
      this.style2 = false;
      this.buscarCancelados(fechaI,fechaF);
    }
    this.ventanaModal = this.modalService.show(templateFinalizados);
    this.ventanaModal.setClass('modal-lg');
  }
  buscarFinalizados(fechaIncio,fechaFin){
    this.registroService.serviciosFinalizados(fechaIncio,fechaFin).subscribe(res =>{
      this.serviciosBusqueda = res.serviciosFinalizados;
      this.valorTotalFinalizados = res.valorTotal;
    });
  }
  buscarProcesos(fechaIncio,fechaFin){
    this.registroService.buscarProcesos(fechaIncio,fechaFin).subscribe(res =>{
      this.serviciosBusqueda = res.serviciosEnProceso;
    });
  }
  buscarCancelados(fechaIncio,fechaFin){
    this.registroService.buscarCancelados(fechaIncio,fechaFin).subscribe(res =>{
      this.serviciosBusqueda = res.serviciosCancelados;
    });
  }

closeVentana(): void {
  this.serviciosBusqueda =[];
  this.ventanaModal.hide();
}
}
