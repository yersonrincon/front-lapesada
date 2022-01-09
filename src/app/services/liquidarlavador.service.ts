import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiquidarlavadorService {

  headers = new HttpHeaders({
    authorization: localStorage.getItem('TokenTifon'),
    apiKeyToken: environment.APYKEY_ADMIN
  });

  constructor(private httpClient: HttpClient) { }

  listarServiciosLavador(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/liquidarlavador/listarServiciosLavador`, datos);
   }
}
