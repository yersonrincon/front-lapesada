import { Component, OnInit , ViewChild,TemplateRef} from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';
import Swal from 'sweetalert2';
import { ValidacionService } from 'app/services/validacion.service';
import { BsModalRef,BsModalService  } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styleUrls: ['./listar-ventas.component.css']
})
export class ListarVentasComponent implements OnInit {

  registroCompra!:FormGroup;
  base64textString: any;
  element: any;
  accionEditar!: any ;
  registroVenta!: FormGroup;
  seleccioneArchivo!: string;
  fechaActual = new Date();
  ventanaModal!: BsModalRef<any>;
  listaProductos: any;
  datos = true;
  accion!:string;


  constructor(
    private fb: FormBuilder,
    private gestionUsuariosService: GestionUsuariosService,
    private modalService: BsModalService,
    private route: Router
  ) { }

  displayedColumns: string[] = ['id', 'nombre', 'precioventa', 'cantidad','codigo',];
  datosInsertados!: MatTableDataSource<any>;
  @ViewChild(MatPaginator ,{static: false }) ListaproductosCompra!: MatPaginator;
  @ViewChild(MatSort, {static :true }) sortProductosCompra!: MatSort;
 
  ngOnInit(): void {
    this.cargarlistaProductos();
  }
 
  applyFilterListarventas(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosInsertados.filter = filterValue.trim().toLowerCase();
  
    if (this.datosInsertados.paginator) {
      this.datosInsertados.paginator.firstPage();
    }
  }


  cargarlistaProductos(){
 
    this.gestionUsuariosService.consultarProductos().subscribe(respuesta=> {
      if (respuesta.ok) {
      this.datosInsertados = respuesta.datosInsertados;
      this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
      this.datosInsertados.paginator = this.ListaproductosCompra;
     this.datosInsertados.sort = this.sortProductosCompra;
      }
      else{
   
        console.log(this.datosInsertados);

      }
      
    });

  
  }
  consultarproductoId(){
    this.gestionUsuariosService.consultaIdproducto().subscribe(respuesta=> {
      if (respuesta.ok) {
        console.log(respuesta.listaProductos);
        this.listaProductos = respuesta.listaProductos;
      }
      else{
   
       

      }
   
    });

  
  }

  
  
    

  openModalVenta(templateVenta: TemplateRef<any>, datos: any){ 
    this.FormularioRegistroVenta(datos);
    this.consultarproductoId();   
    this.ventanaModal = this.modalService.show(templateVenta,{ class: 'modal-lg' });
    this.accionEditar =!! datos;
    datos ? this.accion ='Editar' : this.accion ='Registrar';

  }
  closeVentana(): void {
    this.ventanaModal.hide();
  }

  FormularioRegistroVenta(datos: any){
  console.log(datos)
    this. registroVenta = this.fb.group({
      nombre: [datos.nombre ? datos.nombre : '',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      precioventa : [datos.precioventa ? datos.precioventa :'',[Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      cantidad : [datos.cantidad ? datos.cantidad :'',[Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      codigo: [datos.codigo ? datos.codigo :'',[Validators.required, Validators.minLength(4), Validators.maxLength(15)]],

    });

  }
  get getNombre() {
    return this.  registroVenta.get('nombre');
  }

  get getPrecioventa() {
    return this.  registroVenta.get('precioventa');
  }

  get getCantidad() {
    return this.registroVenta.get('cantidad');
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




  
  registroventas() {
    if (this.accion === 'Registrar') {
    if(this.registroVenta.valid){
      console.log(this.registroVenta.value);
      const datos = {
        nombre: this.registroVenta.value.nombre,
        precioventa: this.registroVenta.value.precioventa,
        cantidad: this.registroVenta.value.cantidad,
        codigo: this.registroVenta.value.codigo,
        
    
      }
    this.gestionUsuariosService.editarProducto(datos).subscribe(respuesta =>{
      if (respuesta.ok === true){
        Swal.fire({
          title : 'edicion exitosa',
          text: `${respuesta.message}`,
          icon: 'success'
        });
           this.consultarproductoId();
      }else if(respuesta.ok === false){
        Swal.fire({
          title: 'Mensaje',
          text: `${respuesta.message}`,
          icon: 'info'
        });            
    }

    });
  }
}
}


editarproductos() {
  if(this.registroVenta.valid){
    console.log(this.registroVenta.value);
    const datos = {
      id: this.registroVenta.value.id,
      nombre: this.registroVenta.value.nombre,
      marca: this.registroVenta.value.marca,
      categoria: this.registroVenta.value.categoria,
      precioventa: this.registroVenta.value.precioventa,
      cantidad: this.registroVenta.value.cantidad,
      codigo: this.registroVenta.value.codigo,
    
  
    }
  console.log(this.base64textString);

  if (this.accion === 'Registrar') {
   // console.log('entro 1');
    this.gestionUsuariosService.crearProducto(datos).subscribe(respuesta => {

      if (respuesta.ok === true) {
        Swal.fire({
          title: 'OK',
          text: `${respuesta.message}`,
          icon: 'success'
        });
        
        this.ventanaModal.hide();
      
      } else if (respuesta.ok === false) {
        Swal.fire({
          title: 'Alerta',
          text: `${respuesta.message}`,
          icon: 'info'
        });
      }
    });
  } else {
   // console.log('entro 2');
    this.gestionUsuariosService.editarProducto(datos).subscribe(respuesta =>{
      this.ventanaModal.hide();
      if (respuesta.ok === true){
        Swal.fire({
          title : 'edicion exitosa',
          text: `${respuesta.message}`,
          icon: 'success'
        });
        this.ventanaModal.hide();
    
      }else if(respuesta.ok === false){
        Swal.fire({
          title: 'Mensaje',
          text: `${respuesta.message}`,
          icon: 'info'
        });            
    }

    });
  }
 //  this.cargarListaProducto();
  this.base64textString='';
  this.seleccioneArchivo= '';
}

}




  handleFileSelect(evt:any) {
    const files = evt.target.files;
    const file = files[0];
    if (files && file) {
      const reader = new FileReader();
      this.seleccioneArchivo = files[0].name;
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  _handleReaderLoaded(readerEvt:any) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }
  
   
  openInputFile(): void {
    this.element = document.getElementById('file-1');
    this.element.click();
  }
}
