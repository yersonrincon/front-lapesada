
import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BsModalRef,BsModalService  } from 'ngx-bootstrap/modal';
import { MatSort } from '@angular/material/sort';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
  registroCotizacion!: FormGroup;
  accionEditar!: any 
  accion!:any;
  ventanaModal!: BsModalRef<any>;
  datos = true;
  total: number = 0;
  blob!:any;
  datosCotizacion =[];
  datosCotizacionTotal = [];
  datosBusquedaDuplicado =[];
  dd: any;
  constructor( private fb: FormBuilder,
    private gestionUsuariosService: GestionUsuariosService,
    private modalService: BsModalService,
    ) { }
    displayedColumns: string[] = [ 'id','nombre','precioventa', 'cantidad'];
           datosInsertados!: MatTableDataSource<any>;
           @ViewChild(MatPaginator ,{static: false }) listaCotizaciones!: MatPaginator;
           @ViewChild(MatSort, {static :true }) sortCotizaciones!: MatSort;


               
  openModalRegistroCotizacion(templateRegistro: TemplateRef<any>,datos:any) {
    this.registrocotizacion(datos);
    this.ventanaModal = this.modalService.show(templateRegistro, { class: 'modal-sm' });
    this.accionEditar =!! datos;
    datos ? this.accion ='Editar' : this.accion ='Registrar';
  }
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


  registrocotizacion(datos:any){
    this. registroCotizacion = this.fb.group({
     id: [datos.id],
     empresa: [datos.empresa ? datos.empresa :'',Validators.required],
     direccion: [datos.direccion ? datos.direccion :'',Validators.required],
     telefono:[datos.telefono ? datos.telefono:'',Validators.required],
     correo: [datos.correo ? datos.correo:'', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
     nombreproductos:[datos.nombreproductos ? datos.nombreproductos:'',Validators.required],
     cantidad:[datos.cantidad ? datos.cantidad:'',Validators.required],
     precio:[datos.precio ? datos.precio:'',Validators.required],
 
    });

  }

  get getEmpresa() {
    return this.  registroCotizacion.get('empresa');
  }
  get getdireccion() {
    return this.  registroCotizacion.get('direccion');
  }
  get getTelefono() {
    return this.  registroCotizacion.get('telefono');
  }
 
  get getCorreo() {
    return this.  registroCotizacion.get('correo');
  }

  get getNombreproductos() {
    return this.  registroCotizacion.get('nombreproductos');
  }
  get getCantidad() {
    return this.  registroCotizacion.get('cantidad');
  }
 
  get getPrecio() {
    return this.  registroCotizacion.get('precio');
  }
  
  cargarListaProducto(){

    this.gestionUsuariosService.consultarListaProductos().subscribe(respuesta=> {


      console.log('listaproductos',this.datosInsertados);

      if (respuesta.ok) {
      this.datosInsertados = respuesta.datosInsertados;
      console.log(this.datosInsertados);
      this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
      this.datosInsertados.paginator = this.listaCotizaciones;
     this.datosInsertados.sort = this.sortCotizaciones; 
    
      }
      else{
   
        console.log(this.datosInsertados);

      }
 
    });

  
  }

  
  cargarListaEmpresa(){
    this.gestionUsuariosService.consultarListaEmpresa().subscribe(respuesta=> {
      if (respuesta.ok) {
      this.datosInsertados = respuesta.datosInsertados;
      console.log('listaempresas',this.datosInsertados);
      this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
   
      }
      else{
   
        console.log(this.datosInsertados);
  
      }
   
    });
  
  
  }
  agregarProductosData(datos){
  
    const filtro =  this.datosCotizacionTotal.find(dato => dato.id === datos.id);
    

    if(filtro){
     
     const producto = { id: datos.id, nombre: datos.nombre, precioventa: datos.precioventa * (filtro.cantidad + 1) , cantidad: filtro.cantidad + 1  };

     this.datosCotizacionTotal = this.datosCotizacionTotal.map(item =>  item.id === datos.id ? producto: item);
      
    } else {
      this.datosCotizacionTotal = [
        ...this.datosCotizacionTotal,
        {
          ...datos,
          cantidad: 1,
        }
      ]
    }
    
    console.log('this.datosCotizacionTotal', this.datosCotizacionTotal);


    console.log('this.datosCotizacionTotal', this.datosCotizacionTotal);

    this.total = 0;
    this.datosCotizacionTotal.forEach(datos => {  
      this.total = Number(datos.precioventa) + this.total;
      console.log("Total: ", this.total)

    });
  }
  

  eliminarProducto(datos){
    this.datosCotizacionTotal.forEach(( element,index) => {
      if(element.id === datos.id){
        this.datosCotizacionTotal.splice(index,1);
      }
      });
console.log(this.datosCotizacionTotal)
  }





  downloadPDF() {
    // Extraemos el
   /*const DATA = document.getElementById('htmlData');
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
    });*/
    const newArray =[ [{text:'Nombre'}, {text:'Precio'}, {text:'cantidad'}]];
    this.datosCotizacionTotal.forEach(datos=>{
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