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
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  registroProducto! : FormGroup;
  registroVenta! : FormGroup;
  imagenProducto! : FormGroup;
  accion!:string;
  selectedcategoria : string;
  selectedMarca : string;
  listaMarca:  [];
  accionEditar!: any ;
  ventanaModal!: BsModalRef<any>;
  seleccioneArchivo!: string;
  base64textString: any;
  image!:string;
  logo = `assets/images/carge2.svg`;
  imagePath: any;
  element: any;
  listaCategorias:any;
  datos = true;  

  constructor(
    private fb: FormBuilder,
    private gestionUsuariosService: GestionUsuariosService,
    private modalService: BsModalService,
    private validador : ValidacionService,
    private route :Router,
    private _sanitizer: DomSanitizer
    
 ){ } 


 displayedColumns: string[] = ['id', 'nombre', 'marca', 'categoria','precioventa', 'descripcion','cantidad','codigo','imagen','editar','eliminar'];
 datosInsertados!: MatTableDataSource<any>;
 @ViewChild(MatPaginator ,{static: false }) listaProductos!: MatPaginator;
 @ViewChild(MatSort, {static :true }) sortProductos!: MatSort;


 

 openModalVerIMG(templateVerIMG: TemplateRef<any>, datos: any){ 
  this.imagenproducto(datos);
   this.image = datos.imagen;
  
this.ventanaModal = this.modalService.show(templateVerIMG,{ class: 'modal-lg' });


}
 
imagenproducto(datos:any){
  console.log('datos',datos);
  this. imagenProducto = this.fb.group({
   nombre: [datos.nombre ? datos.nombre :'',Validators.required],
   imagen : [datos.imagen ? this.image = datos.imagen : this.base64textString,Validators.required],
  });

}
 
  openModalRegistroProducto(templateRegistro: TemplateRef<any>,datos: any) {
    this.registroproducto(datos);
    this.consultarcategorias();
    this.consultarmarca();
  
    console.log('resultado',datos);
    this.ventanaModal = this.modalService.show(templateRegistro, { class: 'modal-sm' });
    this.accionEditar =!! datos;
    datos ? this.accion ='Editar' : this.accion ='Registrar';
     
  }
  
  registroproducto(datos:any){
    console.log('datos',datos);
    this. registroProducto = this.fb.group({
     id: [datos.id],
     nombre: [datos.nombre ? datos.nombre : '',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
     marca: [datos.marca ? datos.marca:'',Validators.required],
     categoria: [datos.categoria ? datos.categoria :'',Validators.required],
     precioventa : [datos.precioventa ? datos.precioventa :'',[Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
     descripcion: [datos.descripcion ? datos.descripcion : '',[Validators.required, Validators.minLength(6), Validators.maxLength(150)]],
     cantidad : [datos.cantidad ? datos.cantidad :'',[Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
     codigo: [datos.codigo ? datos.codigo :'',[Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
     imagen : [datos.imagen ? this.image = datos.imagen : this.base64textString,Validators.required],
    });

  }


  get getNombre() {
    return this.  registroProducto.get('nombre');
  }
  get getMarca() {
    return this.  registroProducto.get('marca');
  }
 
 
  get getCategoria() {
    return this.  registroProducto.get('categoria');
  }
  get getPrecioventa() {
    return this.  registroProducto.get('precioventa');
  }
  get getDescripcion() {
    return this.registroProducto.get('descripcion');
  }
  get getCantidad() {
    return this.registroProducto.get('cantidad');
  }
  get getCodigo() {
    return this.registroProducto.get('codigo');
  }
  get getImagen() {
    return this.registroProducto.get('imagen');
  }
 
 

  closeVentana(): void {
    this.ventanaModal.hide();
  }
   ngOnInit(): void {
   this.cargarListaProducto();
    
   }
   applyFilterUsuarios(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosInsertados.filter = filterValue.trim().toLowerCase();
  
    if (this.datosInsertados.paginator) {
      this.datosInsertados.paginator.firstPage();
    }
  }

  consultarmarca(){
    this.gestionUsuariosService.consultarmarca().subscribe(respuesta=> {
      console.log(respuesta);
      if (respuesta.ok) {
      this.listaMarca = respuesta.marca;
      console.log(this.listaMarca);
      }
      else{
      }
     
    });

  
  }
 





   
 
  cargarListaProducto(){
    this.datos = false;
    this.gestionUsuariosService.consultarListaProductos().subscribe(respuesta=> {
      if (respuesta.ok) {
      this.datosInsertados = respuesta.datosInsertados;
      this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
      this.datosInsertados.paginator = this.listaProductos;
     this.datosInsertados.sort = this.sortProductos;
      }
      else{
   
        console.log(this.datosInsertados);

      }
      this.datos = true;
    });

  
  }
  eliminarProducto(id :any ) {
    Swal.fire({
      title: 'Seguro!!',
      text: 'Esta seguro que desea eliminar el producto.',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then(res => {
      if (res.value) {
        this.gestionUsuariosService.eliminarProducto(id).subscribe(respuesta=> {

          if (respuesta.ok === true) {
            Swal.fire({
              title: 'OK',
              text: `${respuesta.message}`,
              icon: 'success'
            });
         
            this.cargarListaProducto();
          } else if(respuesta.ok === false){
            Swal.fire({
              title: 'Mensaje',
              text: `${respuesta.message}`,
              icon: 'info'
            });            
        }
        });

 } 
}
)}





consultarcategorias(){
    this.gestionUsuariosService.consultarcategorias().subscribe(respuesta=> {
      console.log(respuesta);
      if (respuesta.ok) {
      this.listaCategorias = respuesta.categorias;
      console.log(this.listaCategorias);
      }
      else{
      }
     
    });

  
  }

 

editarproductos() {
  if(this.registroProducto.valid){
    console.log(this.registroProducto.value);
    const datos = {
      id: this.registroProducto.value.id,
      nombre: this.registroProducto.value.nombre,
      marca: this.registroProducto.value.marca,
      categoria: this.registroProducto.value.categoria,
      precioventa: this.registroProducto.value.precioventa,
      descripcion: this.registroProducto.value.descripcion,
      cantidad: this.registroProducto.value.cantidad,
      codigo: this.registroProducto.value.codigo,
      imagen: this.base64textString ? this.base64textString: this.image
  
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
        this.cargarListaProducto();
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
       this.cargarListaProducto();
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


