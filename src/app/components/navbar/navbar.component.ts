import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    loggedIn: boolean;
    datosGoogle: any;
    nombres: string;
    email: string;
    photoUrl: string;
    token: any;
    decoded: any;
    nombreRol: String;
    constructor(
        location: Location,  
        private element: ElementRef, 
        private router: Router,
        private authGoogle: SocialAuthService,
        private authService: SocialAuthService,
        
        ) {
      this.location = location;
          this.sidebarVisible = false;
    }

   
        ngOnInit() {
          this.datosGoogle = JSON.parse(localStorage.getItem('TokenGoogle'));
          console.log(this.datosGoogle);
         
            this.nombres = this.datosGoogle.name;
            this.email = this.datosGoogle.email;
            this.photoUrl = this.datosGoogle.photoUrl;


            this.token = localStorage.getItem('tokenlapesada');
            this.decoded= jwt_decode(this.token);
            this.nombreRol=this.decoded.nombrerol;
      }

  

  
    signOut(): void {
        this.authGoogle.signOut();
        localStorage.removeItem('tokenlapesada');
        this.router.navigateByUrl('/demoPages/login'); 
      }
    


  



    }