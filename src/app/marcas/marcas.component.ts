import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcasService } from 'app/services/marcas.service';
import { ValidacionesService } from 'app/services/validaciones.service';

@Component({
  selector: 'marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  formaMarca: FormGroup; 
  listaMarcas: [];
  estadoBoton: boolean = true;
  public loading = false;

  constructor(private fb: FormBuilder,
              private marcasService: MarcasService,
              private validacionesService: ValidacionesService
              ) { }

  ngOnInit(): void {
    this.crearFormularioMarcas('');
    this.listarMarcas();
  }
  listarMarcas(){
    this.loading = true;
    this.marcasService.listarMarcas().subscribe(res => {
      this.listaMarcas = res.marcas;
     this.loading = false;
    });
 }
 crearFormularioMarcas(datos){
  this.estadoBoton = datos ? false: true;
  this.formaMarca = this.fb.group({
      idmarca: [ datos.idmarca? datos.idmarca:''],
      nombremarca: [ datos.nombremarca? datos.nombremarca:'', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      estado: [datos.estado]
    });
  }
  get nombremarca() {
    return this.formaMarca.get('nombremarca');
  }
  crearEditarMarca(){
    if(this.formaMarca.valid){
      this.loading = true;
      if(this.estadoBoton){
        this.marcasService.crearMarca(this.formaMarca.value).subscribe(res =>{
          if(res.ok){
            this.validacionesService.showNotification('top','right','success', res.message);
            this.listarMarcas();
            this.crearFormularioMarcas('');
            this.loading = false;
          } else {
            this.validacionesService.showNotification('top','right','warning', res.message);
            this.loading = false;
          }
        });
      } else {
        this.marcasService.editarMarca(this.formaMarca.value).subscribe(res =>{
          if(res.ok){
            this.validacionesService.showNotification('top','right','success', res.message);
            this.listarMarcas();
            this.loading = false;
          }           
        });
      }
      
    }
  }  
  cambiarEstado(datos){
    this.loading = true;
    const datosUser ={
      idmarca: datos.idmarca,
      estado: datos.estado? false: true
    }
    this.marcasService.actualizarEstadoMarca(datosUser).subscribe(res =>{
      if(res.ok){
        this.validacionesService.showNotification('top','right','success', res.message);
        this.listarMarcas();
        this.loading = false;
      }
    })
    }
    editarMarca(datos){
    this.crearFormularioMarcas(datos);
    this.estadoBoton = false;
    }
 


}
