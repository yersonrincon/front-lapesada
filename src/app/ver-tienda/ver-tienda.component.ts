import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';
import Swal from 'sweetalert2';
import { ValidacionService } from 'app/services/validacion.service';
import { BsModalService  } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
@Component({
  selector: 'ver-tienda',
  templateUrl: './ver-tienda.component.html',
  styleUrls: ['./ver-tienda.component.css']
})
export class VerTiendaComponent implements OnInit {
  imagenProducto! : FormGroup;
  accion!:string;
  accionEditar!: any 
  seleccioneArchivo!: string;
  base64textString: any;
  image!:string;
  logo = `assets/images/carge2.svg`;
  imagePath: any;
  element: any;
  datos = true;

  constructor(
    private fb: FormBuilder,
    private gestionUsuariosService: GestionUsuariosService,
    private modalService: BsModalService,
    private validador : ValidacionService,
    private route :Router,
  ) { }
  

  displayedColumns: string[] = [  'nombre','imagen','telefono','correo','direccion'];
  datosInsertados!: MatTableDataSource<any>;
  @ViewChild(MatPaginator ,{static: false }) listaempresa!: MatPaginator;
  @ViewChild(MatSort, {static :true }) sortLogoempresa!: MatSort;

  ngOnInit(): void {
    this.cargarLogoEmpresa();
  }
  
  cargarLogoEmpresa(){
      
       this.gestionUsuariosService.consultarListaEmpresa().subscribe(respuesta=> {
         if (respuesta.ok) {
         this.datosInsertados = respuesta.datosInsertados;
       this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
        this.datosInsertados.paginator = this.listaempresa;
        this.datosInsertados.sort = this.sortLogoempresa;
         }
         else{
      
           console.log(this.datosInsertados);
     
         }
     
       });
     
     
     }

     
  applyFilteralmacenes(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosInsertados.filter = filterValue.trim().toLowerCase();
  
    if (this.datosInsertados.paginator) {
      this.datosInsertados.paginator.firstPage();
    }
  }
}
