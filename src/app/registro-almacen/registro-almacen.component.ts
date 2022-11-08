import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidacionService } from 'app/services/validacion.service';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'registro-almacen',
  templateUrl: './registro-almacen.component.html',
  styleUrls: ['./registro-almacen.component.css']
})
export class RegistroAlmacenComponent implements OnInit {
  registroAlmacen !: FormGroup;
  base64textString: any;
  accionEditar!: any;
  image!: string;
  ventanaModal!: BsModalRef<any>;
  accion!: string;
  logo = `assets/img/Recurso3.png`;
  seleccioneArchivo: any;
  element: any;
  sizeByte: any;
  datos = true;
  imagenEmpresa!: any;

  constructor(private fb: FormBuilder,
    private gestionUsuariosService: GestionUsuariosService,
    private modalService: BsModalService,
    private validador: ValidacionService,
    private route: Router,

  ) { }

  displayedColumns: string[] = ['id', 'nombre', 'nit', 'correo', 'telefono', 'direccion', 'imagen', 'editar', 'eliminar'];
  datosInsertados!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) listaProductos!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortProductos!: MatSort;

  openModalRegistroEmpresa(templateRegistro: TemplateRef<any>, datos: any) {
    this.registroalmacen(datos);
    console.log('resultado', datos);
    this.ventanaModal = this.modalService.show(templateRegistro, { class: 'modal-lg' });
    this.accionEditar = !!datos;
    datos ? this.accion = 'Editar' : this.accion = 'Registrar';
    this.image = datos.imagen;
  }
  applyFilterAlmacen(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosInsertados.filter = filterValue.trim().toLowerCase();
    if (this.datosInsertados.paginator) {
      this.datosInsertados.paginator.firstPage();
    }
  }
  openModalVerIMG(templateVerIMG: TemplateRef<any>, datos: any) {
    this.imagenempresa(datos);
    this.image = datos.imagen;
    this.ventanaModal = this.modalService.show(templateVerIMG, { class: 'modal-lg' });
  }

  imagenempresa(datos: any) {
    console.log('datos', datos);
    this.imagenEmpresa = this.fb.group({
      nombre: [datos.nombre ? datos.nombre : '', Validators.required],
      imagen: [datos.imagen ? this.image = datos.imagen : this.base64textString, Validators.required],
    });

  }

  registroalmacen(datos: any) {
    this.registroAlmacen = this.fb.group({
      id: [datos.id],
      nombre: [datos.nombre ? datos.nombre : '', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      nit: [datos.nit ? datos.nit : '', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      correo: [datos.correo ? datos.correo : '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefono: [datos.telefono ? datos.telefono : '', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      direccion: [datos.direccion ? datos.direccion : '', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      imagen: [datos.imagen ? datos.imagen : this.base64textString, Validators.required]

    });
  }
  get getNombre() {
    return this.registroAlmacen.get('nombre');
  }
  get getNit() {
    return this.registroAlmacen.get('nit');
  }

  get getCorreo() {
    return this.registroAlmacen.get('correo');
  }
  get getTelefono() {
    return this.registroAlmacen.get('telefono');
  }
  get getdireccion() {
    return this.registroAlmacen.get('direccion');
  }
  get getImagen() {
    return this.registroAlmacen.get('imagen');
  }

  ngOnInit(): void {
    this.cargarListaEmpresa();
  }
  closeVentana(): void {
    this.ventanaModal.hide();
  }
  editarEmpresa() {
    if (this.registroAlmacen.valid) {
      console.log(this.registroAlmacen.value);
      const datos = {
        nombre: this.registroAlmacen.value.nombre,
        nit: this.registroAlmacen.value.nit,
        correo: this.registroAlmacen.value.correo,
        telefono: this.registroAlmacen.value.telefono,
        direccion: this.registroAlmacen.value.direccion,
        imagen: this.base64textString

      }
      console.log(this.base64textString);

      if (this.accion === 'Registrar') {
        // console.log('entro 1');
        this.gestionUsuariosService.crearEmpresa(datos).subscribe(respuesta => {
          if (respuesta.ok === true) {
            Swal.fire({
              title: 'OK',
              text: `${respuesta.message}`,
              icon: 'success'
            });
            this.ventanaModal.hide();
            this.cargarListaEmpresa();
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
        this.gestionUsuariosService.editarEmpresa(datos).subscribe(respuesta => {
          if (respuesta.ok === true) {
            Swal.fire({
              title: 'edicion exitosa',
              text: `${respuesta.message}`,
              icon: 'success'
            });
            this.ventanaModal.hide();
            this.cargarListaEmpresa();
          } else if (respuesta.ok === false) {
            Swal.fire({
              title: 'Mensaje',
              text: `${respuesta.message}`,
              icon: 'info'
            });
          }
        });
      }
      this.base64textString = '';
    }
  }

  cargarListaEmpresa() {
    this.gestionUsuariosService.consultarListaEmpresa().subscribe(respuesta => {
      if (respuesta.ok) {
        this.datosInsertados = respuesta.datosInsertados;
        this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
        this.datosInsertados.paginator = this.listaProductos;
        this.datosInsertados.sort = this.sortProductos;
      }
      else {
        console.log(this.datosInsertados);
      }
    });
  }

  eliminarEmpresa(id: any) {
    Swal.fire({
      title: 'Seguro!!',
      text: 'Esta seguro que desea eliminar los datos de la empresa .',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then(res => {
      if (res.value) {
        this.gestionUsuariosService.eliminarEmpresa(id).subscribe(respuesta => {

          if (respuesta.ok === true) {
            Swal.fire({
              title: 'OK',
              text: `${respuesta.message}`,
              icon: 'success'
            });
            this.ventanaModal.hide();
            this.cargarListaEmpresa();
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
  handleFileSelect(evt: any) {
    const files = evt.target.files;
    const file = files[0];
    this.sizeByte = files[0].size;
    console.log('tamaño', this.sizeByte)
    let siezekiloByte = this.sizeByte / 1024;
    if (siezekiloByte > 100) {
      alert('El tamaño supera el limite permitido');
      return false;
    }

    if (files && file) {
      const reader = new FileReader();
      this.seleccioneArchivo = files[0].name;
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  _handleReaderLoaded(readerEvt: any) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  openInputFile(): void {
    this.element = document.getElementById('file-1');
    this.element.click();
  }
}
