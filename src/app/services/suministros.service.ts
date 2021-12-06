import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SuministrosService {

  headers = new HttpHeaders({
    authorization: localStorage.getItem('TokenTifon'),
    apiKeyToken: environment.APYKEY_ADMIN
  });
  constructor(private httpClient: HttpClient) { }

  crearSuministro(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonSuministros/crearSuministro`,datos);
   }
   editarSuministro(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonSuministros/editarSuministro`,datos);
   }
   listarSuministro(){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/tifonSuministros/listarSuministro`);
   }
   actualizarEstadoSuministro(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonSuministros/actualizarEstadoSuministro`,datos);
   }
}
