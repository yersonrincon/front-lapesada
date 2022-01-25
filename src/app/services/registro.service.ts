import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  headers = new HttpHeaders({
    authorization: localStorage.getItem('TokenTifon'),
    apiKeyToken: environment.APYKEY_ADMIN
  });
  constructor(private httpClient: HttpClient) { }

  crearRegistro(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/crearRegistro`,datos);
   }
  listarRegistros(fechaInicial,fechaFinal){
    const datos = {fechaInicial,fechaFinal};
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/listarRegistros`,datos);
   }
   consultarFinalizados(fechaInicial,fechaFinal){
     const datos = {fechaInicial,fechaFinal};
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/consultarFinalizados`,datos);
   }
   consultarEnproceso(fechaInicial,fechaFinal){
    const datos = {fechaInicial,fechaFinal};
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/consultarEnproceso`,datos);
   }
   consultarCancelados(fechaInicial,fechaFinal){
    const datos = {fechaInicial,fechaFinal};
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/consultarCancelados`, datos);
   }
   consultarTotales(fechaInicial,fechaFinal){
    const datos = {fechaInicial,fechaFinal};
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/consultarTotales`,datos);
   }
   serviciosDia(fechaInicial,fechaFinal){
    const datos = {fechaInicial,fechaFinal};
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/serviciosDia`,datos);
   }
   listarEstados(){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/tifonRegistros/listarEstados`);
   }
   cambiarEstadoServicio(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/cambiarEstadoServicio`,datos);
   }
   serviciosFinalizados(fechaInicial,fechaFinal){
    const datos = {fechaInicial,fechaFinal};
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/serviciosFinalizados`,datos);
   }
   buscarProcesos(fechaInicial,fechaFinal){
    const datos = {fechaInicial,fechaFinal};
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/buscarProcesos`,datos);
   }
   buscarCancelados(fechaInicial,fechaFinal){
    const datos = {fechaInicial,fechaFinal};
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/buscarCancelados`,datos);
   }
   consultarPlacas(){
    return this.httpClient.get<any>(`${environment.apiUrl}/api/tifonRegistros/consultarPlacas`);
   }
   actualizarOperarioServicio(datos){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/actualizarOperarioServicio`,datos);
   }
   consultarServiciosOperarios(fecha){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/consultarServiciosOperarios`, {fecha});
   }
   buscarFinalizadosOperario(fechaInicial,operario){
    const datos = {fechaInicial,operario};
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/buscarFinalizadosOperario`,datos);
   }
   buscarProcesosOperario(fechaInicial,operario){
    const datos = {fechaInicial,operario};
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/buscarProcesosOperario`,datos);
   }
   buscarCanceladosOperario(fechaInicial,operario){
    const datos = {fechaInicial,operario};
    return this.httpClient.post<any>(`${environment.apiUrl}/api/tifonRegistros/buscarCanceladosOperario`,datos);
   }
}
