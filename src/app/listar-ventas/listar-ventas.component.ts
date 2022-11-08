import { Component, OnInit , ViewChild,TemplateRef} from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { GestionUsuariosService } from 'app/services/gestion-usuarios.service';
import Swal from 'sweetalert2';
import { BsModalRef,BsModalService  } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';



@Component({
  selector: 'app-listar-ventas',
  templateUrl: './listar-ventas.component.html',
  styleUrls: ['./listar-ventas.component.css']
})
export class ListarVentasComponent implements OnInit {

  registroCompra!:FormGroup;
  base64textString: any;
  element: any;
  registroVenta!: FormGroup;
  seleccioneArchivo!: string;
  ventanaModal!: BsModalRef<any>;
  listaProductos: any;
  accion!:string;
  datosGlobales: any;
  constructor(
    private fb: FormBuilder,
    private gestionUsuariosService: GestionUsuariosService,
    private modalService: BsModalService,
    private route: Router
  ) { }
  datos = false;
  displayedColumns: string[] = ['id','nombre', 'precioventa','cantidad','codigo','venta'];
  datosInsertados!: MatTableDataSource<any>;
  @ViewChild(MatPaginator ,{static: false }) ListaproductosCompra!: MatPaginator;
  @ViewChild(MatSort, {static :true }) sortProductosCompra!: MatSort;
 
  ngOnInit(): void {
    this.cargarlistaProductos();
  }
 
 

  cargarlistaProductos(){
    this.datos = false;
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
      this.datos = true;
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
  this.datosGlobales = datos;
    this. registroVenta = this.fb.group({
      nombre: [datos.nombre ? datos.nombre : '',[Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      precioventa : [datos.precioventa ? datos.precioventa :'',[Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      cantidad : [datos.cantidad ? datos.cantidad :'',[Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      codigo: [datos.codigo ? datos.codigo :'',[Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      descripcion: [datos.descripcion ? datos.descripcion : '',[Validators.required, Validators.minLength(6), Validators.maxLength(150)]],
    });

  }
  get getNombre() {
    return this.registroVenta.get('nombre');
  }

  get getPrecioventa() {
    return this.registroVenta.get('precioventa');
  }

  get getCantidad() {
    return this.registroVenta.get('cantidad');
  }

  get getCodigo() {
    return this.registroVenta.get('codigo');
  }
  get getDescripcion() {
    return this.registroVenta.get('descripcion');
  }
  get ventaMayor() {
    const cantidadFormualrio = this.registroVenta.get('cantidad').value;
    const cantidadBasse = this.datosGlobales.cantidad;
  return (cantidadFormualrio > cantidadBasse)? true: false;

  }
  

  
  editarventa() {
    if(this.registroVenta.valid){
      console.log(this.registroVenta.value);
      const datos = {
     
        precioventa: this.registroVenta.value.precioventa,
        cantidad: this.registroVenta.value.cantidad,
        codigo: this.registroVenta.value.codigo,
        descripcion: this.registroVenta.value.descripcion,
     
      }


      if (this.accion === 'Registrar') {
        console.log(this.registroVenta);
        if(this.registroVenta.valid){
          console.log(this.registroVenta.value)
          this.gestionUsuariosService.crearVenta(datos).subscribe(respuesta=>{
            console.log(respuesta);
            if(respuesta.ok === true){
              Swal.fire(
                'venta creada!',
                `${respuesta.message}`,
                'success'
              );
            
              this.closeVentana();
              this.ventanaModal.hide();
              this.route.navigateByUrl('/registro-ventas');
             
            } else if (respuesta.ok == false){
              Swal.fire(
             
                'error',
                `${respuesta.message}`,
                'info'
              );
           
              
            }
         
          })
        } 
      }else {
        // console.log('entro 2');
         this.gestionUsuariosService.editarVenta(datos).subscribe(respuesta =>{
           this.ventanaModal.hide();
           if (respuesta.ok === true){
             Swal.fire({
               title : 'venta exitosa',
               text: `${respuesta.message}`,
               icon: 'success'
             });
             this.cargarlistaProductos();
             this.ventanaModal.hide();
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