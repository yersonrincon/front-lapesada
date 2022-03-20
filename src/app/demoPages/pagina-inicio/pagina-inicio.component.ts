import { Component, OnInit,OnDestroy, HostListener  } from '@angular/core';
import { BsModalRef,BsModalService  } from 'ngx-bootstrap/modal';
@Component({
  selector: 'pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css'],

})
export class PaginaInicioComponent implements OnInit , OnDestroy  {
  ventanaModal!: BsModalRef<any>;
  constructor() { }


  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }

  closeVentana(): void {
    this.ventanaModal.hide();
  }
}
