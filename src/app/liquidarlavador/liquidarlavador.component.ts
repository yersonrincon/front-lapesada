import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LiquidarlavadorService } from 'app/services/liquidarlavador.service';
import { OperariosService } from 'app/services/operarios.service';

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
  valorTotalFinalizados: any;
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
        idoperario:['', [Validators.required]]
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
  buscarServicios(){
   if(this.formaOperarios.valid){
    this.loading = true;

     const datos ={ 
       fecha: this.fechaActual,
       idoperario: this.formaOperarios.value.idoperario
     }
    this.liquidarlavadorService.listarServiciosLavador(datos).subscribe(res =>{
      console.log(res);
      this.serviciosBusqueda = res.listaServiciosLavador;
      this.valorTotalFinalizados = res.valorTotal;
      this.bandera = true;
      this.loading = false;

    });
   }
  }
}
