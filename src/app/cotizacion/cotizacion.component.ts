import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatSort } from '@angular/material/sort';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { imagenes64 } from '../imagenes64/imagenes';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
  [x: string]: any;
  registroCotizacion!: FormGroup;
  accionEditar!: any
  accion!: any;
  ventanaModal!: BsModalRef<any>;
  datos = true;
  total: number = 0;
  blob!: any;
  today!: any;
  datosCotizacion = [];
  datosCotizacionTotal = [];
  datosBusquedaDuplicado = [];
  dd: any;
  yy: { text: string[]; };
  constructor(private fb: FormBuilder,
    private gestionUsuariosService: GestionUsuariosService,
    private modalService: BsModalService,
  ) { }
  displayedColumns: string[] = ['id', 'nombre', 'precioventa', 'cantidad'];
  datosInsertados!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) listaCotizaciones!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortCotizaciones!: MatSort;

  openModalRegistroCotizacion(templateRegistro: TemplateRef<any>, datos: any) {
    this.registrocotizacion(datos);
    this.ventanaModal = this.modalService.show(templateRegistro, { class: 'modal-lg' });
    this.accionEditar = !!datos;
    datos ? this.accion = 'Editar' : this.accion = 'Registrar';
  }
  ngOnInit(): void {
    this.cargarListaProductos();
  }

  applyFilterProductos(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosInsertados.filter = filterValue.trim().toLowerCase();
    if (this.datosInsertados.paginator) {
      this.datosInsertados.paginator.firstPage();
    }
  }

  registrocotizacion(datos: any) {
    this.registroCotizacion = this.fb.group({
      id: [datos.id],
      direccion: [datos.direccion ? datos.direccion : '', Validators.required],
      telefono: [datos.telefono ? datos.telefono : '', Validators.required],
      correo: [datos.correo ? datos.correo : '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      nombreproductos: [datos.nombreproductos ? datos.nombreproductos : '', Validators.required],
      cantidad: [datos.cantidad ? datos.cantidad : '', Validators.required],
      precio: [datos.precio ? datos.precio : '', Validators.required],

    });
  }

  get getdireccion() {
    return this.registroCotizacion.get('direccion');
  }
  get getTelefono() {
    return this.registroCotizacion.get('telefono');
  }

  get getCorreo() {
    return this.registroCotizacion.get('correo');
  }

  get getNombreproductos() {
    return this.registroCotizacion.get('nombreproductos');
  }
  get getCantidad() {
    return this.registroCotizacion.get('cantidad');
  }

  get getPrecio() {
    return this.registroCotizacion.get('precio');
  }

  cargarListaProductos() {
    this.gestionUsuariosService.consultarparacotizacion().subscribe(respuesta => {
      console.log('listaproductos', this.datosInsertados);
      if (respuesta.ok) {
        this.datosInsertados = respuesta.datosInsertados;
        console.log(this.datosInsertados);
        this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
        this.datosInsertados.paginator = this.listaCotizaciones;
        this.datosInsertados.sort = this.sortCotizaciones;
      }
      else {
        console.log(this.datosInsertados);
      }
    });
  }

  cargarListaEmpresa() {
    this.gestionUsuariosService.consultarListaEmpresa().subscribe(respuesta => {
      if (respuesta.ok) {
        this.datosInsertados = respuesta.datosInsertados;
        console.log('listaempresas', this.datosInsertados);
        this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
      }
      else {
        console.log(this.datosInsertados);
      }
    });
  }
  agregarProductosData(datos) {
    const filtro = this.datosCotizacionTotal.find(dato => dato.id === datos.id);
    if (filtro) {
      const producto = { id: datos.id, nombre: datos.nombre, precioventa: datos.precioventa * (filtro.cantidad + 1), cantidad: filtro.cantidad + 1 };
      this.datosCotizacionTotal = this.datosCotizacionTotal.map(item => item.id === datos.id ? producto : item);
    } else {
      this.datosCotizacionTotal = [
        ...this.datosCotizacionTotal,
        {
          ...datos,
          cantidad: 1,
        }
      ]
    }
    console.log('this.datosCotizacionTotal', this.datosCotizacionTotal);
    this.total = 0;
    this.datosCotizacionTotal.forEach(datos => {
      this.total = Number(datos.precioventa) + this.total;
      console.log("Total: ", this.total)

    });
  }


  eliminarProducto(datos) {
    this.datosCotizacionTotal.forEach((element, index) => {
      if (element.id === datos.id) {
        this.datosCotizacionTotal.splice(index, 1);
      }
      this.total = 0;
      this.datosCotizacionTotal.forEach(datos => {
        this.total = Number(datos.precioventa) + this.total;
        console.log("Total: ", this.total)
      });
    });
    console.log(this.datosCotizacionTotal)
  }


  downloadPDF() {
    const newArray = [[{ text: 'Nombre', }, { text: 'Precio' }, { text: 'cantidad' }]];
    
    this.datosCotizacionTotal.forEach(datos => {
    newArray.push([{ text: datos.nombre }, { text: datos.precioventa }, { text: datos.cantidad }])
    });
    console.log(newArray);
    
    this.dd = {
      content: [
        this.date = new Date(),
        {
          text: [
            `Fecha :${( this.date.toUTCString())}`
          ],
          alignment: 'right'
        },
        {
          image : 'imagenes64'
        },
        //this.image = imagenes64,
        {
          bold: true,
          ul: [
            'Direccion: Calle 64 c bis # 85j 65',
            'Telefono: 3208707335 ',
            'Correo: lapesada@gmail.com'
          ],
          color: 'red',
        },
        {
          table: {
            widths: ['*', '*', '*'],
            body: newArray
          },
          fillColor: '#eeffee',
          margin: 45,
          width: 480,
          fontSize: 18,
        },
        {
          text: [
            `TOTAL :${formatterPeso.format(this.total)}`
          ],
          style: 'yerson',
          bold: false
        }
      ],
      styles: {
        yerson: {
          fontSize: 18,
          bold: true,
          alignment: 'right'
        },
      }
    }
    pdfMake.createPdf(this.dd).download('archivo');
  }
}
const formatterPeso = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0
}) 