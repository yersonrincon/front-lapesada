import { Component, OnInit } from '@angular/core';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';

@Component({
  selector: 'pagina-cliente',
  templateUrl: './pagina-cliente.component.html',
  styleUrls: ['./pagina-cliente.component.css']
})
export class PaginaClienteComponent implements OnInit {
  constructor(
    private gestionUsuariosService: GestionUsuariosService,
  ) { }
  datosInsertados!: any;
  /*  @ViewChild(MatPaginator ,{static: false }) listaProductos!: MatPaginator;
    @ViewChild(MatSort, {static :true }) sortProductos!: MatSort;
  */

  cargarLogoEmpresa() {
    //   this.datos = false;
    this.gestionUsuariosService.consultarListaEmpresa().subscribe(respuesta => {
      if (respuesta.ok) {
        this.datosInsertados = respuesta.datosInsertados;
        //  this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
        //      this.datosInsertados.paginator = this.listaProductos;
        //this.datosInsertados.sort = this.sortProductos;
      }
      else {
        console.log(this.datosInsertados);

      }

    });
  }
  ngOnInit(): void {
    this.cargarLogoEmpresa();
  }
}
