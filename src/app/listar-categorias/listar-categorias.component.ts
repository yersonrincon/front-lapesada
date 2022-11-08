import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';
import Swal from 'sweetalert2';
import { BsModalRef,BsModalService  } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent implements OnInit {
  registrarCategoria!:FormGroup;
  base64textString:any;
  accionEditar!: any ;
  datos = true;


  ventanaModal!: BsModalRef<any>;
  accion!:string;

  element: any;
  seleccioneArchivo: any;
    constructor(
    private fb: FormBuilder,
    private gestionUsuariosService: GestionUsuariosService,
    private modalService: BsModalService,
  ) { }

  displayedColumns: string[] = ['id', 'nombre', 'descripcion','estado','editar','eliminar'];
  datosInsertados!: MatTableDataSource<any>;
  @ViewChild(MatPaginator ,{static: false }) listaCategorias!: MatPaginator;
  @ViewChild(MatSort, {static :true }) sortCategorias!: MatSort;
 
   
  openModalRegistroCategorias(templateRegistro: TemplateRef<any>,datos: any) {
    this.registarcategoria(datos);
    console.log('resultado',datos);
    this.ventanaModal = this.modalService.show(templateRegistro, { class: 'modal-lg' });
    this.accionEditar =!! datos;
    datos ? this.accion ='Editar' : this.accion ='Registrar';
   
  }
  applyFilterCategoria(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosInsertados.filter = filterValue.trim().toLowerCase();
    if (this.datosInsertados.paginator) {
      this.datosInsertados.paginator.firstPage();
    }
  }


  actualizarEstadoCategoria(datosUsuario:any) {

    const estado = datosUsuario.estado ? false : true;
    const datos = { id: datosUsuario.id, estado: estado }

    this.gestionUsuariosService.actualizarEstadoCategoria(datos).subscribe(respuesta => {
      if(respuesta.ok === true){
      this.cargarListaCategorias();
         Swal.fire({
          title: 'estado cambiado',
          text: `${respuesta.message}`,
          icon: 'success'
        });
      }
      
    });
  }

 registarcategoria(datos:any){
   this.registrarCategoria = this.fb.group({
     id: [datos.id],
     nombre: [datos.nombre ? datos.nombre : '',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
     descripcion: [datos.descripcion ? datos.descripcion : '',[Validators.required, Validators.minLength(6), Validators.maxLength(150)]],
    
   

   })
 }

 get getNombre(){
   return this.registrarCategoria.get('nombre');
 }
  get getDescripcion(){
   return this.registrarCategoria.get('descripcion')
 }
 
 closeVentana(): void {
  this.ventanaModal.hide();
}
 ngOnInit(): void {
 this.cargarListaCategorias();
  
 }
 editarcategoria() {
  if(this.registrarCategoria.valid){
    console.log(this.registrarCategoria.value);
    const datos = {
      id: this.registrarCategoria.value.id,
      nombre: this.registrarCategoria.value.nombre,
      descripcion: this.registrarCategoria.value.descripcion,
     
 
    }
  console.log(this.base64textString);

  if (this.accion === 'Registrar') {
   // console.log('entro 1');
    this.gestionUsuariosService.crearCategoria(datos).subscribe(respuesta => {

      if (respuesta.ok === true) {
        Swal.fire({
          title: 'OK',
          text: `${respuesta.message}`,
          icon: 'success'
        });
        
        this.ventanaModal.hide();
        this.cargarListaCategorias();
      
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
    this.gestionUsuariosService.editarCategoria(datos).subscribe(respuesta =>{
  
      if (respuesta.ok === true){
        Swal.fire({
          title : 'edicion exitosa',
          text: `${respuesta.message}`,
          icon: 'success'
        });
        this.ventanaModal.hide();
        this.cargarListaCategorias();
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
 
}

}

cargarListaCategorias(){

  this.gestionUsuariosService.consultarListaCategorias().subscribe(respuesta=> {
    if (respuesta.ok) {
      console.log(respuesta.datosInsertados)
    this.datosInsertados = respuesta.datosInsertados;
    this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
    this.datosInsertados.paginator = this.listaCategorias;
   this.datosInsertados.sort = this.sortCategorias;
    }
    else{
 
      console.log(this.datosInsertados);

    }
  
  });


}
eliminarCategoria(id :any ) {
  Swal.fire({
    title: 'Seguro!!',
    text: 'Esta seguro que desea eliminar el producto.',
    icon: 'question',
    showConfirmButton: true,
    showCancelButton: true,
    cancelButtonColor: '#d33',
  }).then(res => {
    if (res.value) {
      this.gestionUsuariosService.eliminarCategoria(id).subscribe(respuesta=> {

        if (respuesta.ok === true) {
          Swal.fire({
            title: 'OK',
            text: `${respuesta.message}`,
            icon: 'success'
          });
       
          this.cargarListaCategorias();
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

 
}
