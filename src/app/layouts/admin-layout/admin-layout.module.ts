import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ListarCategoriasComponent } from 'app/listar-categorias/listar-categorias.component';
import { ListarMarcasComponent } from 'app/listar-marcas/listar-marcas.component';
import { CotizacionComponent } from 'app/cotizacion/cotizacion.component';
import { ListarProveeedorComponent } from 'app/listar-proveedor/listar-proveedor.component';
import { ListarRolesComponent } from 'app/listar-roles/listar-roles.component';
import { ListarProductosComponent } from 'app/listar-productos/listar-productos.component';
import { ListarVentasComponent } from 'app/listar-ventas/listar-ventas.component';
import { RegistroAlmacenComponent } from 'app/registro-almacen/registro-almacen.component';
import { ListarUsuariovendedorComponent } from 'app/listar-usuariovendedor/listar-usuariovendedor.component';
import { RegistroVentasComponent } from 'app/registro-ventas/registro-ventas.component';
import { RegistroCotizacionComponent } from 'app/registro-cotizacion/registro-cotizacion.component';
import { ListarClientesComponent } from 'app/listar-clientes/listar-clientes.component';
import { ProductosClienteComponent } from 'app/productos-cliente/productos-cliente.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ModalModule.forRoot(),  
    MatSortModule,
    MatProgressBarModule,
    MatTableModule,
    MatSlideToggleModule,
    MatPaginatorModule


  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    ListarCategoriasComponent,
    ListarMarcasComponent,

    ProductosClienteComponent,
    ListarProveeedorComponent,
    ListarProductosComponent,
    ListarVentasComponent,
    CotizacionComponent,
    RegistroAlmacenComponent,
    ListarUsuariovendedorComponent,
    RegistroVentasComponent,
    ListarRolesComponent,
    RegistroCotizacionComponent,
    ListarClientesComponent
   
  ]
})

export class AdminLayoutModule {}
