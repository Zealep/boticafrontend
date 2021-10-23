import {ImprimirDTO } from './../model/dto/imprimir';
import { ResponseVenta } from './../model/dto/response-venta';
import { DetalleVenta } from './../model/detalle-venta';
import { Respuesta } from './../model/respuesta';
import { catchError } from 'rxjs/operators';
import { Venta } from './../model/venta';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HOST } from './../shared/constants';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url: string = `${HOST}/venta`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Venta[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getDetailsByVenta(id: number) {
    return this.http.get<DetalleVenta[]>(`${this.url}/find/details/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getAnuladas(){
    return this.http.get<Venta[]>(`${this.url}/anuladas`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number) {
    return this.http.get<Venta>(`${this.url}/find/${id}`);
  }


  save( x: Venta) {
    return this.http.post<Respuesta>(`${this.url}/save`, x)
    .pipe(
      catchError(this.handleError)
    );
  }


  update(x: Venta) {
    return this.http.put<Respuesta>(`${this.url}/save`, x)
    .pipe(
      catchError(this.handleError)
    );
  }

  eliminar(id: number) {
    return this.http.delete<Respuesta>(`${this.url}/delete/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getMes(){
    return this.http.get<number>(`${this.url}/month`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getHoy(){
    return this.http.get<number>(`${this.url}/today`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getUltimaVenta(){
    return this.http.get<number>(`${this.url}/lastCodigo`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getFormatCodigoVenta(codigo:any){
    let parms = new HttpParams();
    parms = parms.append('codigo',codigo);
    return this.http.get<ResponseVenta>(`${this.url}/formatCodigoVenta`,
    {
      params:parms,

    },

    )
  }

  imprimir(t: ImprimirDTO){
    console.log('service', t);
    return this.http.post(`${this.url}/imprimir`, t,{
      responseType: 'blob'
    });
  }

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log('Client error', error.error.message);
    } else {
      // Error en el lado del servidor
      console.log('Error Status:', error.status);
      console.log('Error:', error.error);
    }
    //catch and rethrow
    return throwError(error.error.message);

  }
}
