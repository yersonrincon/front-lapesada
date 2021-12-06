import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  headers = new HttpHeaders({
    authorization: localStorage.getItem('TokenTifon'),
    apiKeyToken: environment.APYKEY_ADMIN
  });
  constructor(private httpClient: HttpClient) { }

  crearMarca(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonMarcas/crearMarca`,datos);
   }
   editarMarca(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonMarcas/editarMarca`,datos);
   }
   listarMarcas(){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/tifonMarcas/listarMarcas`);
   }
   actualizarEstadoMarca(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonMarcas/actualizarEstadoMarca`,datos);
   }
}
