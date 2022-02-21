import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DemoPagesModule } from './demoPages/demoPages.module';
import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es-CO';
registerLocaleData(localEs);
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    DemoPagesModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
    
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-co'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
