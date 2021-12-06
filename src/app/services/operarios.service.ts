import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperariosService {

  headers = new HttpHeaders({
    authorization: localStorage.getItem('TokenTifon'),
    apiKeyToken: environment.APYKEY_ADMIN
  });
  constructor(private httpClient: HttpClient) { }

  crearOperario(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonOperarios/crearOperario`,datos);
   }
   editarOperario(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonOperarios/editarOperario`,datos);
   }
   listarOperarios(){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/tifonOperarios/listarOperarios`);
   }
   actualizarEstadoOperario(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonOperarios/actualizarEstadoOperario`,datos);
   }
}
