import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ValidacionService } from 'app/services/validacion.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.css']
})
export class ListarProveeedorComponent implements OnInit {
  registroProveedor!: FormGroup;
  accion!: string;
  accionEditar!: any
  ventanaModal!: BsModalRef<any>;
  datos = true;


  constructor(private fb: FormBuilder,
    private gestionUsuariosService: GestionUsuariosService,
    private modalService: BsModalService,
    private validador: ValidacionService,
    private route: Router,
  ) { }

  displayedColumns: string[] = ['id', 'nombre', 'correo', 'empresa', 'apellido', 'telefono', 'direccion', 'editar', 'eliminar'];
  datosInsertados!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) listaProveedores!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortProveedores!: MatSort;

  openModalRegistroProveedor(templateRegistro: TemplateRef<any>, datos: any) {
    this.registroproveedor(datos);
    this.ventanaModal = this.modalService.show(templateRegistro, { class: 'modal-lg' });
    this.accionEditar = !!datos;
    datos ? this.accion = 'Editar' : this.accion = 'Registrar';
  }
  registroproveedor(datos: any) {
    this.registroProveedor = this.fb.group({
      id: [datos.id],
      nombre: [datos.nombre ? datos.nombre : '', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      apellido: [datos.apellido ? datos.apellido : '', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      correo: [datos.correo ? datos.correo : '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefono: [datos.telefono ? datos.telefono : '', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      direccion: [datos.direccion ? datos.direccion : '', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      empresa: [datos.empresa ? datos.empresa : '', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    });
  }
  get getNombre() {
    return this.registroProveedor.get('nombre');
  }
  get getApellido() {
    return this.registroProveedor.get('apellido');
  }
  get getCorreo() {
    return this.registroProveedor.get('correo');
  }
  get getTelefono() {
    return this.registroProveedor.get('telefono');
  }
  get getdireccion() {
    return this.registroProveedor.get('direccion');
  }
  get getempresa() {
    return this.registroProveedor.get('empresa');
  }

  closeVentana(): void {
    this.ventanaModal.hide();
  }
  ngOnInit(): void {
    this.cargarListaProveedor();
  }
  applyFilterProveedor(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosInsertados.filter = filterValue.trim().toLowerCase();
    if (this.datosInsertados.paginator) {
      this.datosInsertados.paginator.firstPage();
    }
  }
  cargarListaProveedor() {
    this.gestionUsuariosService.consultarListaProveedor().subscribe(respuesta => {
      if (respuesta.ok) {
        console.log(respuesta.datosInsertados)
        this.datosInsertados = respuesta.datosInsertados;
        this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
        this.datosInsertados.paginator = this.listaProveedores;
        this.datosInsertados.sort = this.sortProveedores;
      }
      else {
        console.log(this.datosInsertados);
      }
    });
  }

  eliminarUsuarioProveedor(id: any) {
    Swal.fire({
      title: 'Seguro!!',
      text: 'Esta seguro que desea eliminar el usuario.',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then(res => {
      if (res.value) {
        this.gestionUsuariosService.eliminarUsuarioProveedor(id).subscribe(respuesta => {
          if (respuesta.ok === true) {
            Swal.fire({
              title: 'OK',
              text: `${respuesta.message}`,
              icon: 'success'
            });
            this.cargarListaProveedor();
          } else if (respuesta.ok === false) {
            Swal.fire({
              title: 'Mensaje',
              text: `${respuesta.message}`,
              icon: 'info'
            });
          }
        });
      }
    }
    )
  }
  editarusuarioproveedor() {
    if (this.registroProveedor.valid) {
      if (this.accion === 'Registrar') {
        this.gestionUsuariosService.crearProveedor(this.registroProveedor.value).subscribe(respuesta => {
          if (respuesta.ok === true) {
            Swal.fire({
              title: 'OK',
              text: `${respuesta.message}`,
              icon: 'success'
            });
            this.ventanaModal.hide();
            this.cargarListaProveedor();
          } else if (respuesta.ok === false) {
            Swal.fire({
              title: 'Alerta',
              text: `${respuesta.message}`,
              icon: 'info'
            });
          }
        });
      } else {
        this.gestionUsuariosService.editarProveedor(this.registroProveedor.value).subscribe(respuesta => {
          if (respuesta.ok === true) {
            Swal.fire({
              title: 'edicion exitosa',
              text: `${respuesta.message}`,
              icon: 'success'
            });
            this.ventanaModal.hide();
            this.cargarListaProveedor();
          } else if (respuesta.ok === false) {
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


