import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegistrosuministrosService {


  headers = new HttpHeaders({
    authorization: localStorage.getItem('TokenTifon'),
    apiKeyToken: environment.APYKEY_ADMIN
  });
  constructor(private httpClient: HttpClient) { }

   crearRegistroSuministro(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistroSuministros/crearRegistroSuministro`,datos);
   }
   listarRegistroSuministros(){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/tifonRegistroSuministros/listarRegistroSuministros`);
   }
}
