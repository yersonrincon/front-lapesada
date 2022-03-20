
import { NgxSpinnerModule } from "ngx-spinner";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';

//import { PaginaClienteComponent } from '../pagina-cliente/pagina-cliente.component';
//import { PaginaClienteComponent } from '../pagina-cliente/pagina-cliente.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,  
    MatIconModule,
    NgxSpinnerModule,
    MatButtonModule
  ],
  declarations: [
  PaginaInicioComponent,
  LoginComponent,
 
  //PaginaClienteComponent
  ]
})

export class DemoPagesModule {}

