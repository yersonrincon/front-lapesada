import { Component, OnInit ,TemplateRef,ViewChild} from '@angular/core';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';

import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { ValidacionService } from 'app/services/validacion.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'listar-usuariovendedor',
  templateUrl: './listar-usuariovendedor.component.html',
  styleUrls: ['./listar-usuariovendedor.component.css']
})
export class ListarUsuariovendedorComponent implements OnInit {
  
  


  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
 
   accion!: string;
   accionEditar!: boolean 
   registroVendedor! : FormGroup;
   ventanaModal!: BsModalRef<any>;
   datos = true;
   listarRoles:any;
  
  
   constructor(
     private fb: FormBuilder,
     private route :Router,
     private modalService: BsModalService, 
     private gestionUsuariosService: GestionUsuariosService,
     private validador : ValidacionService,
      ) { }
  
      displayedColumns:string[] = ['id', 'nombre', 'apellido','telefono', 'correo', 'roles','estado', 'editar','eliminar'];
      datosInsertados!:  MatTableDataSource<any>;
      @ViewChild(MatPaginator ,{static: false }) listaUsuarios!: MatPaginator;
      @ViewChild(MatSort, {static :true }) sortUsuarios!: MatSort;
 
      openModalRegistroUsuario(templateRegistro: TemplateRef<any>,datos :any ) {
       this.registrovendedor(datos);
        this.ventanaModal = this.modalService.show(templateRegistro, { class: 'modal-sm' });
       this.accionEditar = !!datos;
       datos ? this.accion = "Editar" : this.accion = "Registrar";
      }
  
    
 
   applyFilterUsuarios(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.datosInsertados.filter = filterValue.trim().toLowerCase();
   
     if (this.datosInsertados.paginator) {
       this.datosInsertados.paginator.firstPage();
     }
   }
 
 
 
   cargarListaUsuarios() {
     //this.datosInsertados =[];
  
      this.gestionUsuariosService.consultarListaUsuarios().subscribe(respuesta=> {
       if (respuesta.ok) {
        this.datosInsertados = respuesta.datosInsertados;
        this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
        this.datosInsertados.paginator = this.listaUsuarios;
        this.datosInsertados.sort = this.sortUsuarios;
       }
       else{
         console.log(this.datosInsertados);
       }
     
      });
    }
 
  
  
   
    /*openModalcrearEditarVendedor(templateVendedor: TemplateRef<any> , datos :any) {
   
     this.ventanaModal = this.modalService.show(templateVendedor);
     this.accionEditar = !!datos;
     datos ? this.accion = "Editar" : this.accion = "Registrar";
 
   } */
 
   
 
   registrovendedor(datos:any){
      //this.ramdon();
     this. registroVendedor = this.fb.group({
      id: [datos.id],
      nombre: [datos.nombre?datos.nombre :'',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      apellido: [datos.apellido ? datos.apellido : '',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      correo: [datos.correo?datos.correo:'', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      roles:[datos.roles?datos.roles:'',[Validators.required]],
      estado: [datos.estado?datos.estado:'', Validators.required],
      telefono:[datos.telefono?datos.telefono:'',[Validators.required, Validators.minLength(6), Validators.maxLength(10)]]  
     } )
   }
   
   get getNombre() {
     return this.registroVendedor.get('nombre');
   }
   get getApellido() {
     return this.registroVendedor.get('apellido');
   }
  
   get getCorreo() {
     return this.registroVendedor.get('correo');
   }
   get getRoles() {
    return this.  registroVendedor.get('roles');
  }
   get getEstado() {
     return this.registroVendedor.get('estado');
   }
   get getTelefono() {
     return this.registroVendedor.get('telefono');
   }
  
   ngOnInit(): void {
     this.cargarListaUsuarios();
     this.consultarroles();
    // this.ramdon();
    // this.registrovendedor();
 
   }
   closeVentana(): void {
     this.ventanaModal.hide();
   }
   editarUsuarioVendedor(){
    
     if(this.registroVendedor.valid){
       if(this.accion ==='Registrar'){  
       this.gestionUsuariosService.crearEditarUsuarioVendedor(this.registroVendedor.value).subscribe(respuesta=>{
         if(respuesta.ok === true){
           Swal.fire(
             'Creado!',
             `${respuesta.message}`,
             'success'
           );
           this.cargarListaUsuarios();
         }else if (respuesta.ok ==false){
           Swal.fire({
             title: 'Alerta',
             text: `${respuesta.message}`,
             icon: 'info'
           });
         }
         
       });
     } else{
       this.gestionUsuariosService.editarUsuario(this.registroVendedor.value).subscribe(respuesta=>{
         if(respuesta.ok ===true){
           Swal.fire({
             title : 'edicion exitosa',
             text: `${respuesta.message}`,
             icon: 'success'
           });
           this.cargarListaUsuarios();
         }else  if (respuesta.ok === false){
           Swal.fire({
             title: 'Mensaje',
             text: `${respuesta.message}`,
             icon: 'info'
           });      
         }
       })
     }
   }
   }
 
 
   actualizarEstadoUsuario(datosUsuario:any) {
 
     const estado = datosUsuario.estado ? false : true;
     const datos = { id: datosUsuario.id, estado: estado }
 
     this.gestionUsuariosService.actualizarEstadoUsuario(datos).subscribe(respuesta => {
       if(respuesta.ok === true){
       this.cargarListaUsuarios();
          Swal.fire({
           title: 'estado cambiado',
           text: `${respuesta.message}`,
           icon: 'success'
         });
       }
       
     });
   }
 
  
   eliminarUsuarioVendedor(id :any ) {
 
 
         Swal.fire({
           title: 'Seguro!!',
           text: 'Esta seguro que desea eliminar el usuario.',
           icon: 'question',
           showConfirmButton: true,
           showCancelButton: true,
           cancelButtonColor: '#d33',
         }).then(res => {
           if (res.value) {
             this.gestionUsuariosService.eliminarUsuarioVendedor(id).subscribe(respuesta=> {
 
               if (respuesta.ok === true) {
                 Swal.fire({
                   title: 'OK',
                   text: `${respuesta.message}`,
                   icon: 'success'
                 });
                 this.cargarListaUsuarios();
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
 
 
       consultarroles(){
        this.gestionUsuariosService.consultarroles().subscribe(respuesta=> {
          console.log(respuesta);
          if (respuesta.ok) {
          this.listarRoles = respuesta.roles;
          console.log(this.listarRoles);
          }
          else{
          }
         
        });
    
      
      }
 }
 
 
 
 
 