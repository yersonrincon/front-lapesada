import { Routes } from '@angular/router';

import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { ListarProveeedorComponent } from 'app/listar-proveedor/listar-proveedor.component';
import { ListarRolesComponent } from 'app/listar-roles/listar-roles.component';
import { CotizacionComponent } from 'app/cotizacion/cotizacion.component';
import { ListarMarcasComponent } from 'app/listar-marcas/listar-marcas.component';
import { ListarCategoriasComponent } from 'app/listar-categorias/listar-categorias.component';
import { ListarVentasComponent } from 'app/listar-ventas/listar-ventas.component';
import { ListarProductosComponent } from 'app/listar-productos/listar-productos.component';
import { RegistroAlmacenComponent } from 'app/registro-almacen/registro-almacen.component';
import { ListarUsuariovendedorComponent } from 'app/listar-usuariovendedor/listar-usuariovendedor.component';
import { RegistroVentasComponent } from 'app/registro-ventas/registro-ventas.component';
import { RegistroCotizacionComponent } from 'app/registro-cotizacion/registro-cotizacion.component';
import { ListarClientesComponent } from 'app/listar-clientes/listar-clientes.component';
//import { PaginaClienteComponent } from 'app/pagina-cliente/pagina-cliente.component';
import { GuardGuard } from 'app/guards/guard.guard';

import { ProductosClienteComponent } from 'app/productos-cliente/productos-cliente.component';

//import { VigilateGuard } from 'app/demoPages/guards/vigilate.guard';




export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard', canActivate: [GuardGuard], component: DashboardComponent },
    { path: 'listar-roles', canActivate: [GuardGuard], component: ListarRolesComponent },
    { path: 'listar-proveedor', canActivate: [GuardGuard], component: ListarProveeedorComponent },
    { path: 'listar-marcas', canActivate: [GuardGuard], component: ListarMarcasComponent },
    { path: 'cotizacion', canActivate: [GuardGuard], component: CotizacionComponent },
    { path: 'listar-categorias', canActivate: [GuardGuard], component: ListarCategoriasComponent },
    { path: 'listar-ventas', canActivate: [GuardGuard], component: ListarVentasComponent },
    { path: 'listar-productos', canActivate: [GuardGuard], component: ListarProductosComponent },
    { path: 'registro-almacen', canActivate: [GuardGuard], component: RegistroAlmacenComponent },
    { path: 'listar-usuariovendedor', canActivate: [GuardGuard], component: ListarUsuariovendedorComponent },
    { path: 'registro-ventas', canActivate: [GuardGuard], component: RegistroVentasComponent },
    { path: 'registro-cotizacion', canActivate: [GuardGuard], component: RegistroCotizacionComponent },
    { path: 'listar-clientes', canActivate: [GuardGuard], component: ListarClientesComponent },
    { path: 'productos-cliente', canActivate: [GuardGuard], component: ProductosClienteComponent },

    // {path:'pagina-cliente',component:PaginaClienteComponent},

];
