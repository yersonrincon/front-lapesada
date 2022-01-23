import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ServiciosComponent } from 'app/servicios/servicios.component';
import { VehiculosComponent } from '../../vehiculos/vehiculos.component';
import { OperariosComponent } from '../../operarios/operarios.component';
import { MarcasComponent } from '../../marcas/marcas.component';
import { RegistrarServicioComponent } from '../../registrar-servicio/registrar-servicio.component';
import { RegistrosdiaComponent } from '../../registrosdia/registrosdia.component';
import { GuardGuard } from '../../guards/guard.guard';
import { SuministrosComponent } from '../../suministros/suministros.component';
import { RegistrosuministroComponent } from '../../registrosuministro/registrosuministro.component';
import { LiquidarlavadorComponent } from '../../liquidarlavador/liquidarlavador.component';
import { InicioComponent } from '../../inicio/inicio.component';

export const AdminLayoutRoutes: Routes = [
   
    { path: 'dashboard',     canActivate: [GuardGuard], component: DashboardComponent },
    { path: 'user-profile', canActivate: [GuardGuard],  component: UserProfileComponent },
    { path: 'servicios',    canActivate: [GuardGuard],  component: ServiciosComponent },
    { path: 'vehiculos',    canActivate: [GuardGuard],  component: VehiculosComponent },
    { path: 'marcas',       canActivate: [GuardGuard],  component: MarcasComponent },
    { path: 'operarios',          canActivate: [GuardGuard], component: OperariosComponent },
    { path: 'registrar-servicio', canActivate: [GuardGuard], component: RegistrarServicioComponent },
    { path: 'registrosdia',       canActivate: [GuardGuard], component: RegistrosdiaComponent },  
    { path: 'suministros',       canActivate: [GuardGuard], component: SuministrosComponent },   
    { path: 'registrosuministro',canActivate: [GuardGuard], component: RegistrosuministroComponent},
    { path: 'liquidarlavador',canActivate: [GuardGuard], component: LiquidarlavadorComponent},
    { path: 'inicio',canActivate: [GuardGuard], component: InicioComponent}


];
