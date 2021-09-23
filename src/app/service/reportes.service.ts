import { ReporteDetalleVentas } from './../model/dto/reporte-det-ventas';
import { ReporteCompras } from './../model/dto/reporte-compras';
import { ParamsReporteComprasDTO } from './../model/dto/params-reporte-compras';
import { ParamsReporteVentasDTO } from './../model/dto/params-reporte-ventas';
import { ReporteVentas } from './../model/dto/reporte-ventas';
import { Respuesta } from '../model/respuesta';
import { HOST } from '../shared/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Categoria } from '../model/categoria';
import { catchError } from 'rxjs/operators';
import { ReporteDetalleCompras } from '../model/dto/reporte-det-compras';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  url: string = `${HOST}/reporte`;

  constructor(private http: HttpClient) { }

  listVentasByParameters(params:ParamsReporteVentasDTO) {

    return this.http.post<ReporteVentas[]>(`${this.url}/ventas`,params)
    .pipe(
      catchError(this.handleError)
    );
  }

  listDetalleVentasByParameters(params:ParamsReporteVentasDTO) {

    return this.http.post<ReporteDetalleVentas[]>(`${this.url}/detalle-ventas`,params)
    .pipe(
      catchError(this.handleError)
    );
  }

  listComprasByParameters(params:ParamsReporteComprasDTO) {

    return this.http.post<ReporteCompras[]>(`${this.url}/compras`,params)
    .pipe(
      catchError(this.handleError)
    );
  }

  listDetalleComprasByParameters(params:ParamsReporteComprasDTO) {

    return this.http.post<ReporteDetalleCompras[]>(`${this.url}/detalle-compras`,params)
    .pipe(
      catchError(this.handleError)
    );
  }

  exportarExcelVentas(params:ParamsReporteVentasDTO) {
    return this.http.post(`${this.url}/exportVentas`,params,
    {responseType:'blob',
  });
  }

  exportarExcelDetalleVentas(params:ParamsReporteVentasDTO) {
    return this.http.post(`${this.url}/exportDetalleVentas`,params,
    {responseType:'blob',
  });
  }

  exportarExcelCompras(params:ParamsReporteComprasDTO) {
    return this.http.post(`${this.url}/exportCompras`,params,
    {responseType:'blob',
  });
  }

  exportarExcelDetalleCompras(params:ParamsReporteComprasDTO) {
    return this.http.post(`${this.url}/exportDetalleCompras`,params,
    {responseType:'blob',
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
    return throwError('Cannot perform the request, please try again later');

  }
}
