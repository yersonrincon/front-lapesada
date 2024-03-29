import { HttpClient, HttpHeaders, HttpParams,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {
  cargarListaProducto() {
    throw new Error('Method not implemented.');
  }
  headers = new HttpHeaders({
    
  });

  Login(value: any) {
    throw new Error('Method not implemented.');
  }


  constructor(private httpClient: HttpClient) { }


  loginCliente(datos:any){
   return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/loginCliente`,datos);
  }  
  crearUsuario(datos:any) {  
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/crearUsuario`, datos);    
  }
 
  crearUsuarioCliente(datos:any) {  
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/crearUsuarioCliente`, datos);    
  }

  crearVenta(datos:any) {  
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/crearVenta`, datos);    
  }
  crearVendedor(datos:any){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/crearVendedor`,datos);
  }

  crearclientealmacen(datos:any){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/crearclientealmacen`,datos);
  }
  loginpasswords(datos:any){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/loginpasswords`,datos);
  } 

  crearProveedor (datos:any){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/crearProveedor`,datos);
  }

  RegistrarCompras (datos:any){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/RegistrarCompras`,datos);
  }
  crearProducto (datos:any){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/crearProducto`,datos);
  }

  crearCategoria (datos:any){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/crearCategoria`,datos);
  }

  blob (datos:any){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/blob`,datos);
  }

  crearCotizacion (datos:any){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/crearCotizacion`,datos);
  }
  crearMarca (datos:any){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/crearMarca`,datos);
  }

  crearROL(datos:any){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/crearROL`,datos);
  }
  crearEmpresa(datos:any){
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/crearEmpresa`,datos);
  }
  consultarListaUsuarios() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/cargarListaUsuarios`, '');
  }
 
  consultarListaCotizaciones() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarListaCotizaciones`, '');
  }
  consultarclientes() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarclientes`, '');
  }
  
  consultarListaroles() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarListaroles`, '');
  }
  
  consultarListaProveedor() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarListaProveedor`, '');
  }

  consultarListasCotizaciones() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarListasCotizaciones`, '');
  }
  consultarClientealmacen() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarClientealmacen`, '');
  }
  consultarListaProductos() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarListaProductos`, '');
  }
  
  consultarparacotizacion() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarparacotizacion`, '');
  }
  consultarCantidadventas() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarCantidadventas`, '');
  }


  consultarCantidadCotizaciones() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarCantidadCotizaciones`, '');
  }

  consultarCantidadAlmacenes() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarCantidadAlmacenes`, '');
  }
  consultarListaCategorias() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarListaCategorias`, '');
  }

  consultarListaMarcas() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarListaMarcas`, '');
  }
  consultarListaEmpresa() {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarListaEmpresa`, '');
  }
 
  eliminarUsuarioProveedor(id: any) {
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/eliminarUsuarioProveedor`, {id});
  }

  eliminarProducto(id: any) {
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/eliminarProducto`, {id});
 }

 eliminarCategoria(id: any) {
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/eliminarCategoria`, {id});
 }

 eliminarMarca(id: any) {
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/eliminarMarca`, {id});
 }

 eliminarregistrocotizacion(id: any) {
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/eliminarregistrocotizacion`, {id});
 }
 eliminarClientealmacen(id: any) {
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/eliminarClientealmacen`, {id});
 }
 eliminarEmpresa(id: any) {
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/eliminarEmpresa`, {id});
 }

 eliminarCotizacion(id: any) {
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/eliminarCotizacion`, {id});
 }
 eliminarUsuarioRol(id: any) {
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/eliminarUsuarioRol`, {id});
 }
  eliminarUsuarioVendedor(id: any) {
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/eliminarUsuarioVendedor`, {id});
 }

  crearEditarUsuarioVendedor(datos: any ){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/crearEditarUsuarioVendedor`,datos);
 }

  editarUsuario(datos: any){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/editarUsuario`, datos);
 }

 editarVenta(datos: any){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/editarVenta`, datos);
 }

  editarProducto(datos: any){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/editarProducto`, datos);
 }

 editarCategoria(datos: any){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/editarCategoria`, datos);
 }


 editarRoles(datos: any){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/editarRoles`, datos);
 }
 editarClientesAlmacen(datos: any){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/editarClientesAlmacen`, datos);
 }


 editarMarca(datos: any){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/editarMarca`, datos);
 }
 editarEmpresa(datos: any){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/editarEmpresa`, datos);
 }
  editarProveedor(datos: any){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/editarProveedor`, datos);
 }

 consultarcategorias(){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarcategorias`, '');
}

consultaralmacenes(){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultaralmacenes`, '');
}

consultarmarca(){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarmarca`, '');
}
consultarProductos(){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarProductos`, '');
}

consultarListaVentas(){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarListaVentas`, '');
}

consultarroles(){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarroles`, '');
}

consultarCantidad(){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultarCantidad`, '');
}
consultaIdproducto(){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/consultaIdproducto`, '');

}

 actualizarEstadoMarca(datos: any){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/actualizarEstadoMarca`, datos);
 }
 actualizarEstadoUsuario(datos: any){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/actualizarEstadoUsuario`, datos);
 }

 actualizarEstadoCategoria(datos: any){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/actualizarEstadoCategoria`, datos);
 }

 actualizarEstadoRol(datos: any){
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/actualizarEstadoRol`, datos);
 }
 enviarCotizacion(archivos, correo: any) {
  const headers = new HttpHeaders({ });
  const params = new HttpParams({fromString: `correo=${correo}&_limit=10`});
  return this.httpClient.post<any>(`${environment.apiUrl}/api/administrador/cargar`, archivos, {headers, params});
  }
}
