import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';

import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PaginaInicioComponent } from './demoPages/pagina-inicio/pagina-inicio.component';
import { LoginComponent } from './demoPages/login/login.component';


//import { PaginaClienteComponent } from './pagina-cliente/pagina-cliente.component';

import { DemoPagesModule } from './demoPages/demoPages.module';
/*const routes: Routes =[
  {
    path: '', redirectTo: 'demoPages/pagina-inicio', pathMatch: 'full'},{
    path: '',component: AdminLayoutComponent,children: [{path: '', loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)}]
  },
  
  {
    path: '',
    component: PaginaInicioComponent,
    children: [{path: 'demoPages/pagina-incio', component:PaginaInicioComponent, data: { extraParameter: '' } } ]
  },
];*/

const routes: Routes =[
   { path: '', redirectTo: 'demoPages/pagina-inicio',  pathMatch: 'full' },   
   { path: '',component: PaginaInicioComponent, children:  [{path: 'demoPages/pagina-inicio', component: PaginaInicioComponent, data: {extraparameter: ''}}]},
   { path: '',component: LoginComponent, children:  [{path: 'demoPages/login', component: LoginComponent, data: {extraparameter: ''}}]},
 //  { path: '',component: PaginaClienteComponent, children:  [{path: 'demoPages/pagina-cliente', component: PaginaClienteComponent, data: {extraparameter: ''}}]},
   { path: '',component: AdminLayoutComponent, children:  [{path: '',loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)}]},

];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
