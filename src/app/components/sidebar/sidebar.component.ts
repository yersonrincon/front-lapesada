import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
 export const ROUTES: RouteInfo[] = [
  
     {path:'/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
     {path:'/pagina-inicio',title: 'paginainicio',  icon:'unarchive', class: '' },
     {path:'/listar-proveedor', title: 'proveedor',  icon:'unarchive', class: '' },
     {path:'/listar-roles', title: 'roles',  icon:'unarchive', class: '' },
     {path:'/listar-marcas', title: 'marcas',  icon:'unarchive', class: '' },
     {path:'/listar-categorias', title: 'categorias',  icon:'unarchive', class: '' },
     {path:'/listar-ventas',title: 'ventas',  icon:'unarchive', class: '' },
     {path:'/listar-productos',title: 'productos',  icon:'unarchive', class: '' },
     {path:'/cotizacion',title: 'cotizacion',  icon:'unarchive', class: '' },
     {path:'/registro-almacen',title: 'almacen',  icon:'unarchive', class: '' },
     {path:'/listar-usuariovendedor',title: 'usuario',  icon:'unarchive', class: '' },
     {path:'/ventas',title:'ventas',   icon:'unarchive', class: '' },
     {path:'/registro-ventas',title: 'registroventas',  icon:'unarchive', class: '' },
     {path:'/registro-cotizacion',title: 'cotizacion',  icon:'unarchive', class: '' },
     {path:'/listar-clientes',title: 'clientes',  icon:'unarchive', class: '' },
     {path:'/productos-cliente',title: 'produto almacen',  icon:'unarchive', class: '' },
     {path:'/ver-tienda',title: 'ver tienda',  icon:'unarchive', class: '' },
     {path: 'demoPages/login', title: 'Cerrar sesión',  icon:'power_settings_new', class: 'active-pro',  },
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  token=localStorage.getItem('tokenlapesada');
  decoded: any;
  roles:number;
  constructor() { }

  ngOnInit() {
    this.token = localStorage.getItem('tokenlapesada');
    this.decoded= jwt_decode(this.token);
    this.roles=this.decoded.roles;
    console.log('rolesyerson',this.decoded)
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
