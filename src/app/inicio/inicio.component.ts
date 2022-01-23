import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../services/registro.service';

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


  constructor(
    private registroService: RegistroService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.fechaActual = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.consultarServiciosOperarios();
  }
  consultarServiciosOperarios(){
    this.loading = true;
    this.registroService.consultarServiciosOperarios(this.fechaActual).subscribe(res =>{
    this.servicioOperarios = res.servicioOperarios;
    this.loading = false;
    });
  }
}
