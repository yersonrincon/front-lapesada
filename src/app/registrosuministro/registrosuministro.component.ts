import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidacionesService } from '../services/validaciones.service';
import jwt_decode from 'jwt-decode';
import { UsuariosService } from '../services/usuarios.service';
import { OperariosService } from '../services/operarios.service';
import { SuministrosService } from '../services/suministros.service';
import { RegistrosuministrosService } from '../services/registrosuministros.service';


@Component({
  selector: 'registrosuministro',
  templateUrl: './registrosuministro.component.html',
  styleUrls: ['./registrosuministro.component.css'],
  providers: [DatePipe],

})
export class RegistrosuministroComponent implements OnInit {
  formaRegistroSuministro: FormGroup; 
  fechaActual: any;
  usuario: any;
  listaUsuarios: [];
  listaOperarios: [];
  listaSuministros: [];
  token = localStorage.getItem('TokenTifon');

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe,              
              private operariosService: OperariosService,
              private suministrosService: SuministrosService,
              private registrosuministrosService: RegistrosuministrosService,
              private validacionesService: ValidacionesService ) { }

  ngOnInit(): void {
    this.fechaActual = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const decoded: any = jwt_decode(this.token);
    this.usuario = decoded.idusuario;
    this.crearFormularioSuministros();
    this.listarOperarios();
    this.listarSuministros();
  }

  listarOperarios(){
    this.operariosService.listarOperarios().subscribe(res => {
    this.listaOperarios = res.operarios.filter(datos => datos.estado == true);
  });
}
  listarSuministros(){
    this.suministrosService.listarSuministro().subscribe(res => {
    this.listaSuministros = res.suministros.filter(datos => datos.estado == true);
  });
}
  crearFormularioSuministros(){
    this.formaRegistroSuministro = this.fb.group({
        idsuministro: ['', Validators.required],
        idusuario: [this.usuario],
        idoperario: ['', Validators.required],
        fecha: [this.fechaActual, Validators.required]
      });
  }
  get idsuministro() {
    return this.formaRegistroSuministro.get('idsuministro');
  }
  get idoperario() {
    return this.formaRegistroSuministro.get('idoperario');
  }
  crearSuministro(){
    this.registrosuministrosService.crearRegistroSuministro(this.formaRegistroSuministro.value).subscribe(res =>{
      if(res.ok){
        this.validacionesService.showNotification('top','right','success', res.message);
      }
    });
  }
   
}
