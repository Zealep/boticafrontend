import { Respuesta } from './../model/respuesta';
import { catchError } from 'rxjs/operators';
import { Gasto } from './../model/gasto';
import { HOST } from './../shared/constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  url: string = `${HOST}/gasto`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Gasto[]>(`${this.url}/list`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number) {
    return this.http.get<Gasto>(`${this.url}/find/${id}`);
  }


  save( x: Gasto) {
    return this.http.post<Respuesta>(`${this.url}/save`, x)
    .pipe(
      catchError(this.handleError)
    );
  }


  update(x: Gasto) {
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
