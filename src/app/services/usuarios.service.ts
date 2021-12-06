import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'selenium-webdriver';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  headers = new HttpHeaders({
    authorization: localStorage.getItem('TokenTifon'),
    apiKeyToken: environment.APYKEY_ADMIN
  });
  constructor(private httpClient: HttpClient) { }

  crearUsuario(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonUsuarios/crearUsuario`,datos);
   }
   editarUsuario(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonUsuarios/editarUsuario`,datos);
   }
   listarUsuarios(){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/tifonUsuarios/listarUsuarios`);
   }
   listarRoles(){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/tifonUsuarios/listarRoles`);
   }
   actualizarEstadoUsuario(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonUsuarios/actualizarEstadoUsuario`,datos);
   }
  

}
