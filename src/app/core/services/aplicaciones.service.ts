
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Cliente } from '../interface/Cliente';



@Injectable({
  providedIn: 'root'
})
export class AplicacionesService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/aplicaciones`;
    return this.http.get<any>(url, {headers});
  }

  getActive(): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/aplicaciones-activos`;
    return this.http.get<any>(url, {headers});
  }

  getById(id): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/aplicaciones/${id}`;
    return this.http.get<any>(url, {headers});
  }

  postData(data: Cliente): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/aplicaciones`;
    return this.http.post<any>(url, data, {headers});
  }

  putData(id:number, data: Cliente): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/aplicaciones/${id}`;
    return this.http.patch<any>(url, data, {headers});
  }

  getFilter(data: Cliente): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/aplicaciones/filter`;
    return this.http.post<any>(url, data, {headers});
  }

  postEstado(id:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/aplicaciones/cambiarEstado`;
    let data ={id};
    return this.http.post<any>(url, data, {headers});
  }

  postFilter(item:any): Observable<any> {
    const headers = { 'Authorization': 'Bearer '+localStorage.getItem('token') }
    let url=`${environment.baseURL}/aplicaciones-filter`;
    return this.http.post<any>(url, item, {headers});
  }




}
