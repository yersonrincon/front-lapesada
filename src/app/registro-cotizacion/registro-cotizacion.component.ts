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
  selector: 'registro-cotizacion',
  templateUrl: './registro-cotizacion.component.html',
  styleUrls: ['./registro-cotizacion.component.css']
})
export class RegistroCotizacionComponent implements OnInit {


  registroCotizacion! : FormGroup;
  doc!: any;
  //datosInsertados :any
  accion!:string;
   seleccioneArchivo!: string;
  element: any;
  imagenCotizacion! :  FormGroup;
  accionEditar!: any;
  image!:string;
  logo = `assets/images/carge2.svg`;
  base64textString: any;
  ventanaModal!: BsModalRef<any>;
  datos = true;
  file_store: FileList;
  file_list: Array<string> = [];
  
  constructor(private fb: FormBuilder,
              private gestionUsuariosService: GestionUsuariosService,
              private modalService: BsModalService,
          
             
           ){ } 
         
           displayedColumns: string[] = ['id', 'fecha', 'correo','editar','eliminar' ];
           datosInsertados!: MatTableDataSource<any>;
           @ViewChild(MatPaginator ,{static: false }) listaCotizaciones!: MatPaginator;
           @ViewChild(MatSort, {static :true }) sortCotizaciones!: MatSort;
         
           
           openModalVerIMG(templateVerIMG: TemplateRef<any>, datos: any){ 
            this.imagencotizacion(datos);
             this.image = datos.imagen;
            
          this.ventanaModal = this.modalService.show(templateVerIMG,{ class: 'modal-lg' });
          
          
          }
           
  openModalRegistroCotizacion(templateRegistro: TemplateRef<any>,datos:any) {
    this.registrocotizacion();
    this.ventanaModal = this.modalService.show(templateRegistro, { class: 'modal-sm' });
    this.accionEditar =!! datos;
    datos ? this.accion ='Editar' : this.accion ='Registrar';
  }
  registrocotizacion(){
    this.registroCotizacion = this.fb.group({
     correo: ['', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
     archivo: ['', Validators.required],  
    
    });

  } 
  get getCorreo() {
    return this.registroCotizacion.get('correo');
  }
  get archivo() {
    return this.registroCotizacion.get('archivo');
  }

  onFileChangeHojaDeVida(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registroCotizacion.patchValue({
        fileSource: file
      });
    }
  }
  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.archivo.patchValue(`${f.name}${count}`);
    } else {
      this.archivo.patchValue("");
    }
  }

  handleSubmit(): void {
     if(this.registroCotizacion.valid){
      let formData = new FormData();
      this.file_list = [];
      /*for (let i = 0; i < this.file_store.length; i++) {
        fd.append("archivo", this.file_store[i], this.file_store[i].name);
        this.file_list.push(this.file_store[i].name);
      }*/
      
     
      formData.append("archivo", this.file_store[0], `${this.registroCotizacion.value.correo}.pdf`);
       
  console.log(formData);
      this.gestionUsuariosService.enviarCotizacion(formData,this.registroCotizacion.value.correo).subscribe(respuesta=>{

        Swal.fire({
          title: 'OK',
          text: `${respuesta.message}`,
          icon: 'success'
        });
        this.ventanaModal.hide();
        console.log(respuesta)

      });
    }
   
  }

  closeVentana(): void {
    this.ventanaModal.hide();
  }

   ngOnInit(): void {
    this. cargarListaCotizaciones();
 

  }

  applyFilterCotizacion(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosInsertados.filter = filterValue.trim().toLowerCase();
  
    if (this.datosInsertados.paginator) {
      this.datosInsertados.paginator.firstPage();
    }
  }

 
  cargarListaCotizaciones(){
    this.gestionUsuariosService.consultarListaCotizaciones().subscribe(respuesta=> {
      if (respuesta.ok) {

      this.datosInsertados = respuesta.datosInsertados;
      this.datosInsertados = new MatTableDataSource(respuesta.datosInsertados);
      this.datosInsertados.paginator = this.listaCotizaciones;
     this.datosInsertados.sort = this.sortCotizaciones;
      }
      else{
   
        console.log(this.datosInsertados);

      }
   
    });

  
  }
  imagencotizacion(datos:any){
    console.log('datos',datos);
    this.imagenCotizacion = this.fb.group({
     nombre: [datos.nombre ? datos.nombre :'',Validators.required],
     imagen : [datos.imagen ? this.image = datos.imagen : this.base64textString,Validators.required],
    });
  
  }
   


  eliminarUsuarioProveedor(id :any ) {
    Swal.fire({
      title: 'Seguro!!',
      text: 'Esta seguro que desea eliminar el usuario.',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then(res => {
      if (res.value) {
        this.gestionUsuariosService.eliminarUsuarioProveedor(id).subscribe(respuesta=> {

          if (respuesta.ok === true) {
            Swal.fire({
              title: 'OK',
              text: `${respuesta.message}`,
              icon: 'success'
            });
            this.cargarListaCotizaciones();
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



  editarcotizaciones() {
    if(this.registroCotizacion.valid){
    if (this.accion === 'Registrar') {
      this.gestionUsuariosService.crearCotizacion(this.registroCotizacion.value).subscribe(respuesta => {

        if (respuesta.ok === true) {
          Swal.fire({
            title: 'OK',
            text: `${respuesta.message}`,
            icon: 'success'
          });
          this.cargarListaCotizaciones();
       
        } else if (respuesta.ok === false) {
          Swal.fire({
            title: 'Alerta',
            text: `${respuesta.message}`,
            icon: 'info'
          });
        }
      });
    } else {
      this.gestionUsuariosService.editarCotizacion(this.registroCotizacion.value).subscribe(respuesta =>{
        if (respuesta.ok === true){
          Swal.fire({
            title : 'edicion exitosa',
            text: `${respuesta.message}`,
            icon: 'success'
          });
             this.cargarListaCotizaciones();
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


