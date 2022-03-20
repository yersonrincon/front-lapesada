import { Component, OnInit,TemplateRef, ViewChild  } from '@angular/core';
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
  selector: 'listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {




    registroClientes! : FormGroup;
  
    //datosInsertados :any
    accion!:string;
    accionEditar!: any 
    ventanaModal!: BsModalRef<any>;
    datos = true;
  
    
    constructor(private fb: FormBuilder,
                private gestionUsuariosService: GestionUsuariosService,
                private modalService: BsModalService,
                private validador : ValidacionService,
                private route :Router,
             ){ } 
           
             displayedColumns: string[] = ['id', 'nombre', 'correo', 'apellido', 'telefono', 'direccion','editar' ,'eliminar'];
             datosInsertados!: MatTableDataSource<any>;
             @ViewChild(MatPaginator ,{static: false }) listarClientes!: MatPaginator;
             @ViewChild(MatSort, {static :true }) sortClientes!: MatSort;
           
             
          
    openModalRegistroClientes(templateRegistro: TemplateRef<any>,datos:any) {
      this.registroclientes(datos);
      this.ventanaModal = this.modalService.show(templateRegistro, { class: 'modal-sm' });
      this.accionEditar =!! datos;
      datos ? this.accion ='Editar' : this.accion ='Registrar';
    }
    registroclientes(datos:any){
      this. registroClientes = this.fb.group({
       id: [datos.id],
       nombre: [datos.nombre?datos.nombre :'',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
       apellido: [datos.apellido ? datos.apellido : '',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
       correo: [datos.correo ? datos.correo:'', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
       telefono:[datos.telefono?datos.telefono:'',[Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
       direccion: [datos.direccion ? datos.direccion :'',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]], 
      
      });
  
    }
    get getNombre() {
      return this.  registroClientes.get('nombre');
    }
    get getApellido() {
      return this.  registroClientes.get('apellido');
    }
   
    get getCorreo() {
      return this.  registroClientes.get('correo');
    }
    get getTelefono() {
      return this.  registroClientes.get('telefono');
    }
    get getdireccion() {
      return this.  registroClientes.get('direccion');
    }

    
  
    closeVentana(): void {
      this.ventanaModal.hide();
    }
  
     ngOnInit(): void {
      this. cargarListaClientes();
      
    }
  
    applyFilterClientes(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.datosInsertados.filter = filterValue.trim().toLowerCase();
    
      if (this.datosInsertados.paginator) {
        this.datosInsertados.paginator.firstPage();
      }
    }

   
    cargarListaClientes(){
      this.gestionUsuariosService.consultarClientealmacen().subscribe(respuesta=> {
        if (respuesta.ok) {
        console.log(respuesta.datosInsertados)
        this.datosInsertados = respuesta.datosInsertados;
        this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
        this.datosInsertados.paginator = this.listarClientes;
       this.datosInsertados.sort = this.sortClientes;
        }
        else{
     
          console.log(this.datosInsertados);
  
        }
     
      });
  
    
    }
  
    eliminarClientealmacen(id :any ) {
      Swal.fire({
        title: 'Seguro!!',
        text: 'Esta seguro que desea eliminar el usuario.',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then(res => {
        if (res.value) {
          this.gestionUsuariosService.eliminarClientealmacen(id).subscribe(respuesta=> {
  
            if (respuesta.ok === true) {
              Swal.fire({
                title: 'OK',
                text: `${respuesta.message}`,
                icon: 'success'
              });
              this.cargarListaClientes();
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
  
  
    editarcliente() {
      if(this.registroClientes.valid){
      if (this.accion === 'Registrar') {
        this.gestionUsuariosService.crearclientealmacen(this.registroClientes.value).subscribe(respuesta => {
  
          if (respuesta.ok === true) {
            Swal.fire({
              title: 'OK',
              text: `${respuesta.message}`,
              icon: 'success'
            });
            this.cargarListaClientes();
         
          } else if (respuesta.ok === false) {
            Swal.fire({
              title: 'Alerta',
              text: `${respuesta.message}`,
              icon: 'info'
            });
          }
        });
      } else {
        this.gestionUsuariosService.editarClientes(this.registroClientes.value).subscribe(respuesta =>{
          if (respuesta.ok === true){
            Swal.fire({
              title : 'edicion exitosa',
              text: `${respuesta.message}`,
              icon: 'success'
            });
               this.cargarListaClientes();
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
  
  
  