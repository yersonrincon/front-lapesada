import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import {AgmCoreModule} from '@agm/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DemoPagesModule } from './demoPages/demoPages.module';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider,FacebookLoginProvider} from 'angularx-social-login';
//import { CookieService } from 'ngx-cookie-service';


import { PaginaInicioComponent } from './demoPages/pagina-inicio/pagina-inicio.component';
import { ɵparseCookieValue } from '@angular/common';

import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

//import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    SocialLoginModule,
    MatButtonModule,
    RouterModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    AppRoutingModule,
    DemoPagesModule,
    ModalModule.forRoot(),  
    NgBootstrapFormValidationModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
   
  
  
 

    

  

   

  ],
  
 providers: [
    
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('217139744467-i0i93nv0da7jdvfiq5lhl7vo0jnn2jpv.apps.googleusercontent.com')},
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ]
      } as SocialAuthServiceConfig,
    },
   // CookieService,
  ],
  bootstrap: [AppComponent],

})


export class AppModule { }
