import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Registro de lavados',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'Usuarios',  icon:'person', class: '' },
    { path: '/servicios', title: 'Servicios',  icon:'room_service', class: '' },
    { path: '/vehiculos', title: 'Vehiculos',  icon:'directions_car', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: 'demoPages/login', title: 'Cerrar sesión',  icon:'power_settings_new', class: 'active-pro' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
