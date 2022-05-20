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
import pdfMake from 'pdfmake/build/pdfmake';
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
  dd: any;
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



    this.total = 0;
    this.productosCarrito.forEach(datos => {  
      this.total = Number(datos.precioventa) + this.total;
      console.log("Total: ", this.total)

    });
  }
  
  
  eliminarProducto(datos){
    this.productosCarrito.forEach(( element,index) => {
      if(element.id === datos.id){
        this.productosCarrito.splice(index,1);
      }
      });
      this.total = 0;
      this.productosCarrito.forEach(datos => {  
        this.total = Number(datos.precioventa) + this.total;
        console.log("Total: ", this.total)
  
      });

  }


  downloadPDF() {
   
    const newArray =[ [{text:'Nombre'}, {text:'Precio'}, {text:'cantidad'}]];
    this.productosCarrito.forEach(datos=>{
      newArray.push([{ text: datos.nombre},{ text: datos.precioventa},{ text: datos.cantidad}])
    });
  

    console.log(newArray);
    this.dd = {
      content: [
        {
          
          table: {
            widths:['*', '*', '*'],
            body: 
              //['Nombre', 'Precio', 'cantidad'],
              newArray
           
          }
        },
        {
          text: [
            `TOTAL :${formatterPeso.format(this.total)}`
          ],
          style: 'header',
          bold: false
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'right'
        }
      }
    }
    pdfMake.createPdf(this.dd).download('archivo');
  }

 
}

const formatterPeso = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
})