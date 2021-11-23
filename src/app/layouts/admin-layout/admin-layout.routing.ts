import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TypographyComponent } from '../../typography/typography.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ServiciosComponent } from 'app/servicios/servicios.component';
import { VehiculosComponent } from '../../vehiculos/vehiculos.component';

export const AdminLayoutRoutes: Routes = [
   
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'servicios',        component: ServiciosComponent },
    { path: 'vehiculos',        component: VehiculosComponent }
];
