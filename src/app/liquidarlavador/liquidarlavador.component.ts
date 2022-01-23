import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiquidarlavadorService } from 'app/services/liquidarlavador.service';
import { OperariosService } from 'app/services/operarios.service';
import * as moment from 'moment';

@Component({
  selector: 'liquidarlavador',
  templateUrl: './liquidarlavador.component.html',
  styleUrls: ['./liquidarlavador.component.css'],
  providers: [DatePipe],

})
export class LiquidarlavadorComponent implements OnInit {
  fechaActual: any;
  formaOperarios: FormGroup;
  listaOperarios =[];
  serviciosBusqueda = [];
  listaSuministroLavador = [];
  valorTotalFinalizados: any;
  valorSuministros: any;
  totalGanacia: any;
  bandera = false;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private operariosService: OperariosService,
    private liquidarlavadorService: LiquidarlavadorService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.fechaActual = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.crearFormularioOperarios();
    this.listarOperarios();
  }
  crearFormularioOperarios(){
    this.formaOperarios = this.fb.group({
        idoperario:['', [Validators.required]],
        fecha:['', [Validators.required]],
      });
    }
    get idoperario() {
      return this.formaOperarios.get('idoperario');
    }
    get fecha() {
      return this.formaOperarios.get('fecha');
    }
    listarOperarios(){
      this.loading = true;
      this.operariosService.listarOperarios().subscribe(res => {
        this.listaOperarios = res.operarios.filter(datos => datos.estado == true); 
      this.loading = false;
    
      });
    }
  buscarServicios(){
    console.log(this.formaOperarios.value);
   if(this.formaOperarios.valid){
    this.loading = true;

     const datos ={ 
       fecha: moment(this.formaOperarios.value.fecha).format('YYYY-MM-DD'),
       idoperario: this.formaOperarios.value.idoperario
     }
    this.liquidarlavadorService.listarServiciosLavador(datos).subscribe(res =>{
      this.serviciosBusqueda = res.listaServiciosLavador;
      this.listaSuministroLavador = res.listaSuministroLavador;
      this.valorTotalFinalizados = res.valorTotal;
      this.valorSuministros = res.valorSuministros;
      this.totalGanacia = res.totalGanacia;
      this.bandera = true;
      this.loading = false;

    });
   }
  }
}
