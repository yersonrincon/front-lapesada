
import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';
import  Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ValidacionService } from 'app/services/validacion.service';
import { BsModalRef,BsModalService  } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'listar-roles',
  templateUrl: './listar-roles.component.html',
  styleUrls: ['./listar-roles.component.css']
})
export class ListarRolesComponent implements OnInit {

  
  registroRoles!: FormGroup;

  //datosInsertados :any
  accion!:string;
  element: any;
  seleccioneArchivo: any;
  accionEditar!: any;
  ventanaModal!: BsModalRef<any>;
  datos = true;

  
  constructor(private fb: FormBuilder,
              private gestionUsuariosService: GestionUsuariosService,
              private modalService: BsModalService,
              private validador : ValidacionService,
              private route :Router,
           ){ } 
         
           displayedColumns: string[] = ['id', 'nombre','descripcion', 'estado','editar' ,'eliminar'];
           datosInsertados!: MatTableDataSource<any>;
           @ViewChild(MatPaginator ,{static: false }) listaRoles!: MatPaginator;
           @ViewChild(MatSort, {static :true }) sortRoles!: MatSort;
         
           
        
  openModalRegistroRol(templateRegistro: TemplateRef<any>,datos:any) {
    this.registrorol(datos);
    this.ventanaModal = this.modalService.show(templateRegistro, { class: 'modal-sm' });
    this.accionEditar =!! datos;
    datos ? this.accion ='Editar' : this.accion ='Registrar';
  }
  registrorol(datos:any){
    this.registroRoles = this.fb.group({
     id: [datos.id],
     nombre: [datos.nombre ? datos.nombre :'',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
     descripcion: [datos.descripcion ? datos.descripcion :'',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],

    });

  }
  get getNombre() {
    return this.registroRoles.get('nombre');
  }
   get getDescripcion(){
    return this.registroRoles.get('descripcion');
   }

  closeVentana(): void {
    this.ventanaModal.hide();
  }

   ngOnInit(): void {
    this. cargarListaRoles();
    
  }

  applyFilterRoles(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosInsertados.filter = filterValue.trim().toLowerCase();
  
    if (this.datosInsertados.paginator) {
      this.datosInsertados.paginator.firstPage();
    }
  }

 
  cargarListaRoles(){
    this.gestionUsuariosService.consultarListaroles().subscribe(respuesta=> {
      if (respuesta.ok) {
      console.log(respuesta.datosInsertados)
      this.datosInsertados = respuesta.datosInsertados;
      this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
      this.datosInsertados.paginator = this.listaRoles;
      this.datosInsertados.sort = this.sortRoles;
      }
      else{
   
        console.log(this.datosInsertados);

      }
   
    });

  
  }

  eliminarRoles(id :any ) {
    Swal.fire({
      title: 'Seguro!!',
      text: 'Esta seguro que desea eliminar el usuario.',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then(res => {
      if (res.value) {
        this.gestionUsuariosService.eliminarUsuarioRol(id).subscribe(respuesta=> {

          if (respuesta.ok === true) {
            Swal.fire({
              title: 'OK',
              text: `${respuesta.message}`,
              icon: 'success'
            });
            this.cargarListaRoles();
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
actualizarEstadoRol(datosUsuario:any) {

  const estado = datosUsuario.estado ? false : true;
  const datos = { id: datosUsuario.id, estado: estado }

  this.gestionUsuariosService.actualizarEstadoRol(datos).subscribe(respuesta => {
    if(respuesta.ok === true){
    this.cargarListaRoles();
       Swal.fire({
        title: 'estado cambiado',
        text: `${respuesta.message}`,
        icon: 'success'
      });
    }
    
  });
}

editarRoles() {
  if(this.registroRoles.valid){
    console.log(this.registroRoles.value);
    const datos = {
      id: this.registroRoles.value.id,
      nombre: this.registroRoles.value.nombre,
      descripcion: this.registroRoles.value.descripcion,
    
     
 
    }

 
    if(this.registroRoles.valid){
    if (this.accion === 'Registrar') {
      this.gestionUsuariosService.crearROL(datos).subscribe(respuesta => {

        if (respuesta.ok === true) {
          Swal.fire({
            title: 'OK',
            text: `${respuesta.message}`,
            icon: 'success'
          });
          this.ventanaModal.hide();
          this.cargarListaRoles();
       
        } else if (respuesta.ok === false) {
          Swal.fire({
            title: 'Alerta',
            text: `${respuesta.message}`,
            icon: 'info'
          });
        }
      });
    } else {
      this.gestionUsuariosService.editarRoles(datos).subscribe(respuesta =>{
        if (respuesta.ok === true){
          Swal.fire({
            title : 'edicion exitosa',
            text: `${respuesta.message}`,
            icon: 'success'
          });
          this.ventanaModal.hide();
             this.cargarListaRoles();
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
}
}