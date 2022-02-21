import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'registrosdia',
  templateUrl: './registrosdia.component.html',
  styleUrls: ['./registrosdia.component.css'],
  providers: [DatePipe],

})
export class RegistrosdiaComponent implements OnInit {
  listaRegistros: [];
  formaFechas: FormGroup;
  fechaActual: any;
  public loading = false;
  constructor(private registroService: RegistroService,
              private fb: FormBuilder,
              private datePipe: DatePipe,
    ) { }

  ngOnInit(): void {
    this.fechaActual = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.listarRegistros(this.fechaActual,this.fechaActual);
    this.crearFormularioFechas();
  }
  listarRegistros(fechaInicial,fechaFinal){
    this.loading = true;
    this.registroService.listarRegistros(fechaInicial,fechaFinal).subscribe(res =>{
    this.listaRegistros = res.listaRegistros;
    console.log(this.listaRegistros);
    this.loading = false;
    });
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
      this.listarRegistros(fechaIncio,fechaFin);
      }
    }
}
