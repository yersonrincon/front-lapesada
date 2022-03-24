import { Component, OnInit,ViewChild,TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { BsModalRef,BsModalService  } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';
@Component({
  selector: 'ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  datoVentaProductos =[];

  datosresta=[];
  datos = true;
  ventanaModal!: BsModalRef<any>;
  registroVenta!: FormGroup;
 


  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private route: Router,
    private gestionUsuariosService: GestionUsuariosService
  ) { }
  FormularioRegistroVenta(datos: any){
    console.log(datos)
      this. registroVenta = this.fb.group({
       fecha: [ '',Validators.required],
       precio : ['',Validators.required],
       descripcion : ['',Validators.required],
       cantidad : ['',Validators.required],
       producto : ['',Validators.required],
       codigo : ['',Validators.required],
  
      });
  
    }
    get getFecha() {
      return this.registroVenta.get('fecha');
    }
    get getPrecio() {
      return this.registroVenta.get('precio');
    }
    get getDescripcion() {
      return this.registroVenta.get('descripcion');
    }
    get getCantidad() {
      return this.registroVenta.get('cantidad');
    }
    get getProducto() {
      return this.registroVenta.get('producto');
    }
    get getCodigo() {
      return this.registroVenta.get('codigo');
    }


    crearVenta(){
      console.log(this.registroVenta);
      if(this.registroVenta.valid){
        console.log(this.registroVenta.value)
        this.gestionUsuariosService.crearVenta(this.registroVenta.value).subscribe(respuesta=>{
          console.log(respuesta);
          if(respuesta.ok === true){
            Swal.fire(
              'venta creada!',
              `${respuesta.message}`,
              'success'
            );
            this.closeVentana();
            this.route.navigateByUrl('/registro-ventas');
           
          } else if (respuesta.ok == false){
            Swal.fire(
           
              'error',
              `${respuesta.message}`,
              'info'
            );
            this.closeVentana();
            
          }
       
        })
      } 
    }
    
  
  openModalVenta(templateVenta: TemplateRef<any>, datos: any){ 
    this.FormularioRegistroVenta(datos); 
    this.ventanaModal = this.modalService.show(templateVenta,{ class: 'modal-lg' });


  }
  closeVentana(): void {
    this.ventanaModal.hide();
  }

  applyFilterProductos(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosInsertados.filter = filterValue.trim().toLowerCase();
  
    if (this.datosInsertados.paginator) {
      this.datosInsertados.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.cargarListaProducto();
  }


  displayedColumns: string[] = [ 'id','nombre','precioventa', 'cantidad' ,'venta'];
           datosInsertados!: MatTableDataSource<any>;
           @ViewChild(MatPaginator ,{static: false }) listaCotizaciones!: MatPaginator;
           @ViewChild(MatSort, {static :true }) sortCotizaciones!: MatSort;



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
  eliminarProducto(datos){
    this.datoVentaProductos.forEach(( element,index) => {
      if(element.id === datos.id){
        this.datoVentaProductos.splice(index,1);
      }
      });
console.log(this.datoVentaProductos)
  }



  agregarProductosData(datos){
  
    const filtro =  this.datoVentaProductos.find(dato => dato.id === datos.id);
    

    if(filtro){
     
     const producto = { id: datos.id, nombre: datos.nombre, precioventa: datos.precioventa * (filtro.cantidad + 1) , cantidad: filtro.cantidad + 1  };

     this.datoVentaProductos = this.datoVentaProductos.map(item =>  item.id === datos.id ? producto: item);
      
    } else {
      this.datoVentaProductos = [
        ...this.datoVentaProductos,
        {
          ...datos,
          cantidad: 1,
        }
      ]
    }
    
    console.log('this.datoVentaProductos', this.datoVentaProductos);

  }
  

  restarProductosData(row){
  
    const filtro =  this.datosresta.find(dato => dato.id === row.id);
    

    if(filtro){
     
     const producto = { id: row.id, nombre: row.nombre, precioventa: row.precioventa * (filtro.cantidad + 1) , cantidad: filtro.cantidad + 1  };

     this.datosresta = this.datosresta.map(item =>  item.id === row.id ? producto: item);
      
    } else {
      this.datosresta = [
        ...this.datosresta,
        {
          ...row,
          cantidad: 1,
        }
      ]
    }
    
    console.log('this.datosresta', this.datosresta);

  }
}
