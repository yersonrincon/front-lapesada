import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'registro-ventas',
  templateUrl: './registro-ventas.component.html',
  styleUrls: ['./registro-ventas.component.css']
})
export class RegistroVentasComponent implements OnInit {
  datos = true;
  constructor(
    private fb: FormBuilder,
    private gestionUsuariosService: GestionUsuariosService,
   
  ) { }

 displayedColumns: string[] = ['id', 'fecha','descripcion','cantidad',];
 datosInsertados!: MatTableDataSource<any>;
 @ViewChild(MatPaginator ,{static: false }) listaVentas!: MatPaginator;
 @ViewChild(MatSort, {static :true }) sortVentas!: MatSort;
    



 applyFilterVentas(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.datosInsertados.filter = filterValue.trim().toLowerCase();

  if (this.datosInsertados.paginator) {
    this.datosInsertados.paginator.firstPage();
  }
}

  cargarListaVentas(){
    
    this.gestionUsuariosService.consultarListaVentas().subscribe(respuesta=> {
      if (respuesta.ok) {
      this.datosInsertados = respuesta.datosInsertados;
      this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
      this.datosInsertados.paginator = this.listaVentas;
     this.datosInsertados.sort = this.sortVentas;
      }
      else{
   
        console.log(this.datosInsertados);

      }
      
    });

  
  }
  
  ngOnInit(): void {
    this.cargarListaVentas();
  }
}


