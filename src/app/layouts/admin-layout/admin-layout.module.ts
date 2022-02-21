import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ServiciosComponent} from '../../servicios/servicios.component';
import { VehiculosComponent } from '../../vehiculos/vehiculos.component';
import { OperariosComponent } from '../../operarios/operarios.component';
import { MarcasComponent } from '../../marcas/marcas.component';
import { RegistrarServicioComponent } from '../../registrar-servicio/registrar-servicio.component';
import { RegistrosdiaComponent } from '../../registrosdia/registrosdia.component';
import { SuministrosComponent } from '../../suministros/suministros.component';
import { RegistrosuministroComponent } from '../../registrosuministro/registrosuministro.component';
import { LiquidarlavadorComponent } from '../../liquidarlavador/liquidarlavador.component';
import { InicioComponent } from '../../inicio/inicio.component';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxCurrencyModule } from "ngx-currency";
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxLoadingModule } from 'ngx-loading';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es-CO';
registerLocaleData(localEs);
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
    MatSlideToggleModule,
    MatRadioModule,
    NgxCurrencyModule,
    ModalModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    SelectDropDownModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    ServiciosComponent,
    VehiculosComponent,
    OperariosComponent,
    MarcasComponent,
    RegistrarServicioComponent,
    RegistrosdiaComponent,
    SuministrosComponent,
    RegistrosuministroComponent,
    LiquidarlavadorComponent,
    InicioComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-co'
    }
  ]
})

export class AdminLayoutModule {}
