import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  headers = new HttpHeaders({
    authorization: localStorage.getItem('TokenTifon'),
    apiKeyToken: environment.APYKEY_ADMIN
  });
  constructor(private httpClient: HttpClient) { }

  crearVehiculo(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonTipoVehiculo/crearVehiculo`,datos);
   }
   editarVehiculo(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonTipoVehiculo/editarVehiculo`,datos);
   }
   listarVehiculos(){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/tifonTipoVehiculo/listarVehiculos`);
   }
   actualizarEstadoVehiculo(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonTipoVehiculo/actualizarEstadoVehiculo`,datos);
   }
}
