
import { Component, OnInit,TemplateRef, ViewChild  } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';
import Swal from 'sweetalert2';
import { BsModalRef,BsModalService  } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'listar-marcas',
  templateUrl: './listar-marcas.component.html',
  styleUrls: ['./listar-marcas.component.css']
})
export class ListarMarcasComponent implements OnInit {
  registrarMarca!:FormGroup;
  accionEditar!: any ;
  ventanaModal!: BsModalRef<any>;
  accion!:string;
  logo = `assets/images/Recursoyer.svg`;
  element: any;
  seleccioneArchivo: any;
  datos = true;

    constructor(
    private fb: FormBuilder,
    private gestionUsuariosService: GestionUsuariosService,
    private modalService: BsModalService,
  ) { }

  displayedColumns: string[] = ['id', 'nombre', 'descripcion','estado','eliminar','editar'];
  datosInsertados!: MatTableDataSource<any>;
  @ViewChild(MatPaginator ,{static: false }) listaMarcas!: MatPaginator;
  @ViewChild(MatSort, {static :true }) sortMarcas!: MatSort;
 
   
  openModalRegistroMarcas(templateRegistro: TemplateRef<any>,datos: any) {
    this.registrarmarca(datos);
    console.log('resultado',datos);
    this.ventanaModal = this.modalService.show(templateRegistro, { class: 'modal-sm' });
    this.accionEditar =!! datos;
    datos ? this.accion ='Editar' : this.accion ='Registrar';
   
  }




  registrarmarca(datos:any){
   this.registrarMarca = this.fb.group({
     id: [datos.id],
     nombre: [datos.nombre ? datos.nombre : '',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
     descripcion: [datos.descripcion ? datos.descripcion : '',[Validators.required, Validators.minLength(6), Validators.maxLength(150)]],
     estado:[datos.estado?datos.estado:'',Validators.required],
  


   })
 }

 get getNombre(){
   return this.registrarMarca.get('nombre');
 }
  get getDescripcion(){
   return this.registrarMarca.get('descripcion')
 }
 get getEstado(){
   return this.registrarMarca.get('estado');
 }

 closeVentana(): void {
  this.ventanaModal.hide();
}
 ngOnInit(): void {
 this.cargarListaMarcas();
  
 }
 applyFilterMarca(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.datosInsertados.filter = filterValue.trim().toLowerCase();

  if (this.datosInsertados.paginator) {
    this.datosInsertados.paginator.firstPage();
  }
}
 editarMarca() {
  if(this.registrarMarca.valid){
    console.log(this.registrarMarca.value);
    const datos = {
      id: this.registrarMarca.value.id,
      nombre: this.registrarMarca.value.nombre,
      descripcion: this.registrarMarca.value.descripcion,
      estado:this.registrarMarca.value.estado,
     
 
    }


  if (this.accion === 'Registrar') {
   // console.log('entro 1');
    this.gestionUsuariosService.crearMarca(datos).subscribe(respuesta => {

      if (respuesta.ok === true) {
        Swal.fire({
          title: 'OK',
          text: `${respuesta.message}`,
          icon: 'success'
        });
        
        this.ventanaModal.hide();
        this.cargarListaMarcas();
      
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
    this.gestionUsuariosService.editarMarca(datos).subscribe(respuesta =>{
  
      if (respuesta.ok === true){
        Swal.fire({
          title : 'edicion exitosa',
          text: `${respuesta.message}`,
          icon: 'success'
        });
        this.ventanaModal.hide();
        this.cargarListaMarcas();
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

 
}

}

cargarListaMarcas(){

  this.gestionUsuariosService.consultarListaMarcas().subscribe(respuesta=> {
    if (respuesta.ok) {
    this.datosInsertados = respuesta.datosInsertados;
    this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
    this.datosInsertados.paginator = this.listaMarcas;
   this.datosInsertados.sort = this.sortMarcas;
    }
    else{
 
      console.log(this.datosInsertados);

    }

  });


}

eliminarMarca(id :any ) {
  Swal.fire({
    title: 'Seguro!!',
    text: 'Esta seguro que desea eliminar el producto.',
    icon: 'question',
    showConfirmButton: true,
    showCancelButton: true,
    cancelButtonColor: '#d33',
  }).then(res => {
    if (res.value) {
      this.gestionUsuariosService.eliminarMarca(id).subscribe(respuesta=> {

        if (respuesta.ok === true) {
          Swal.fire({
            title: 'OK',
            text: `${respuesta.message}`,
            icon: 'success'
          });
       
          this.cargarListaMarcas();
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
actualizarEstadoMarca(datosUsuario:any) {

  const estado = datosUsuario.estado ? false : true;
  const datos = { id: datosUsuario.id, estado: estado }

  this.gestionUsuariosService.actualizarEstadoMarca(datos).subscribe(respuesta => {
    if(respuesta.ok === true){
    this.cargarListaMarcas();
       Swal.fire({
        title: 'estado cambiado',
        text: `${respuesta.message}`,
        icon: 'success'
      });
    }
    
  });
}




openInputFile(): void {
  this.element = document.getElementById('file-1');
  this.element.click();
}
 
}

