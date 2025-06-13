import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/animalventas`;
    return this.http.get<any>(url, {headers});
  }

  getActive(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/animalventas/activos`;
    return this.http.get<any>(url, {headers});
  }

  getById(id): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/animalventas/${id}`;
    return this.http.get<any>(url, {headers});
  }

  postData(data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/animalventas`;
    return this.http.post<any>(url, data, {headers});
  }

  putData(id:any, data: any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/animalventas/${id}`;
    return this.http.patch<any>(url, data, {headers});
  }

  postDetalles(item:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/animalventas-detalles`;
    return this.http.post<any>(url, item, {headers});
  }

  postEstado(id:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/animalventas/cambiarEstado`;
    let data ={id};
    return this.http.post<any>(url, data, {headers});
  }

  postFilter(item:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/animalventas-filter`;
    return this.http.post<any>(url, item, {headers});
  }



  deleteDetalleById(id): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/animalventas-detalles/${id}`;
    return this.http.delete<any>(url, {headers});
  }

  getCodigo(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/animalventas-getCodigo`;
    return this.http.get<any>(url, {headers});
  }

getByNumero(data:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/animalventas-getByNumero`;
    return this.http.post<any>(url, data, {headers});
  }


    getHistorialAplicaciones(id:any): Observable<any> {
      const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
      let url=`${environment.baseURL}/animalventas-insumos/${id}`;
      return this.http.get<any>(url, {headers});
    }

    reporteConsolidado(data:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/animalventas-consolidado-general`;
    return this.http.post<any>(url, data, {headers});
  }

  reporteConsolidadoIndividual(data:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/animalventas-individual`;
    return this.http.post<any>(url, data, {headers});
  }







}
