import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';
import Swal from 'sweetalert2';
import { ValidacionService } from 'app/services/validacion.service';
import { BsModalRef,BsModalService  } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'

@Component({
  selector: 'productos-cliente',
  templateUrl: './productos-cliente.component.html',
  styleUrls: ['./productos-cliente.component.css']
})
export class ProductosClienteComponent implements OnInit {
  imagenProducto! : FormGroup;
  accion!:string;
  accionEditar!: any 
  ventanaModal!: BsModalRef<any>;
  seleccioneArchivo!: string;
  base64textString: any;
  image:string;
  logo = `assets/images/carge2.svg`;
  imagePath: any;
  element: any;
  blob:any;
  total:number;
  listaCategorias:any;
  listaMarca:any;
  cantidades:any;
  datos = true;
  productosCarrito=[];
  constructor(
    private fb: FormBuilder,
    private gestionUsuariosService: GestionUsuariosService,
    private modalService: BsModalService,
    private validador : ValidacionService,
    private route :Router,
    
  ) { }

  

  displayedColumns: string[] = [ 'nombre','imagen','descripcion'];
           datosInsertados!: MatTableDataSource<any>;
           @ViewChild(MatPaginator ,{static: false }) listaProductos!: MatPaginator;
           @ViewChild(MatSort, {static :true }) sortProductos!: MatSort;
  ngOnInit(): void {
    this.cargarListaProducto();
     this.cargarListaEmpresa();
    

  /*  this.total = this.totales.reduce((
      acc,
      obj,
    ) => acc + (obj.precioventa + obj.precioventa),
    0);
    console.log("Total: ", this.total) */
     
    }

    applyFilterProductos(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.datosInsertados.filter = filterValue.trim().toLowerCase();
    
      if (this.datosInsertados.paginator) {
        this.datosInsertados.paginator.firstPage();
      }
    }
  
    
    cargarListaEmpresa(){
      this.gestionUsuariosService.consultarListaEmpresa().subscribe(respuesta=> {
        if (respuesta.ok) {
        this.datosInsertados = respuesta.datosInsertados;
        console.log('listaempresas',this.datosInsertados);
        this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
     
        }
        else{
     
          console.log('empresa',this.datosInsertados);
    
        }
     
      });
    
    
    }

    cargarListaProducto(){

      this.gestionUsuariosService.consultarListaProductos().subscribe(respuesta=> {
  
  
        console.log('listaproductos',this.datosInsertados);
  
        if (respuesta.ok) {
        this.datosInsertados = respuesta.datosInsertados;
        console.log(this.datosInsertados);
        this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
        this.datosInsertados.paginator = this.listaProductos;
       this.datosInsertados.sort = this.sortProductos; 
      
        }
        else{
     
          console.log(this.datosInsertados);
  
        }
   
      });
  
    
    }
  
  
  
  applyFilterUsuarios(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosInsertados.filter = filterValue.trim().toLowerCase();
  
    if (this.datosInsertados.paginator) {
      this.datosInsertados.paginator.firstPage();
    }
  }

  agregarProductosData(datos){
 
    const filtro =  this.productosCarrito.find(dato => dato.id === datos.id);
    

    if(filtro){
     
     const producto = { id: datos.id, nombre: datos.nombre, precioventa: datos.precioventa * (filtro.cantidad + 1) , cantidad: filtro.cantidad + 1  };

     this.productosCarrito = this.productosCarrito.map(item =>  item.id === datos.id ? producto: item);
      
    } else {
      this.productosCarrito = [
        ...this.productosCarrito,
        {
          ...datos,
          cantidad: 1,
        }
      ]
    }
    
    
    console.log('this.datosCotizacionTotal', this.productosCarrito);

    this.total = this.productosCarrito.reduce((
      acc,
       obj,
    
    ) => acc + (obj.precioventa), 0);
    console.log("Total: ", this.total)
  
  }
  
  eliminarProducto(datos){
    this.productosCarrito.forEach(( element,index) => {
      if(element.id === datos.id){
        this.productosCarrito.splice(index,1);
      }
      });
console.log(this.productosCarrito)

  }


  ownloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
     this.blob = doc.output('blob');
    });
  }
  }

