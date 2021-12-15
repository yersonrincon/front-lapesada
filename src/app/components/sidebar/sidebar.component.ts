import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    permiso: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Registro de lavados',  icon: 'dashboard', class: '', permiso: 'si' },
    { path: '/registrar-servicio', title: 'Registrar servicio',  icon: 'border_color', class: '',permiso: 'si' },
    { path: '/registrosdia', title: 'Registros dia',  icon: 'wb_sunny', class: '', permiso: 'si' },
    { path: '/user-profile', title: 'Usuarios',  icon:'person', class: '', permiso: 'si' },
    { path: '/servicios', title: 'Tipo servicios',  icon:'room_service', class: '', permiso: 'no' },
    { path: '/vehiculos', title: 'Tipo vehiculos',  icon:'directions_car', class: '', permiso: 'si' },
    { path: '/marcas', title: 'Marcas vehiculos',  icon:'bookmark', class: '', permiso: 'si' },
    { path: '/operarios', title: 'Operarios',  icon:'person_pin', class: '', permiso: 'no' },
    { path: 'demoPages/login', title: 'Cerrar sesión',  icon:'power_settings_new', class: 'active-pro', permiso: 'si' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  token = localStorage.getItem('TokenTifon');
  idrol: number;

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    const decoded: any = jwt_decode(this.token);
    this.idrol = decoded.idrol;
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
