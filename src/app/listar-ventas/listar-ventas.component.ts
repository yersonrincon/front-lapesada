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
  image!:string;
  element: any;
  registroVenta!: FormGroup;
  seleccioneArchivo!: string;
  fechaActual = new Date();
  ventanaModal!: BsModalRef<any>;
  listaProductos: any;
  datos = true;


  constructor(
    private fb: FormBuilder,
    private gestionUsuariosService: GestionUsuariosService,
    private modalService: BsModalService,
    private route: Router
  ) { }

  displayedColumns: string[] = ['id', 'imagen','nombre', 'marca', 'precioventa', 'cantidad','codigo','venta'];
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


  }
  closeVentana(): void {
    this.ventanaModal.hide();
  }

  FormularioRegistroVenta(datos: any){
  console.log(datos)
    this. registroVenta = this.fb.group({
     fecha: [ '',Validators.required],
     precio : ['',Validators.required],
     descripcion : ['',Validators.required],
     cantidad : ['',Validators.required],
     producto : ['',Validators.required],
     codigo : ['',Validators.required],

    });

  }

  get getFecha() {
    return this.registroVenta.get('fecha');
  }
  get getPrecio() {
    return this.registroVenta.get('precio');
  }
  get getDescripcion() {
    return this.registroVenta.get('descripcion');
  }
  get getCantidad() {
    return this.registroVenta.get('cantidad');
  }
  get getProducto() {
    return this.registroVenta.get('producto');
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
