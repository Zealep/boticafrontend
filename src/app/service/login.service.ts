import { ResponseLogin } from './../model/dto/response-login';
import { Empleado } from 'src/app/model/empleado';
import { HOST } from './../shared/constants';
import { RequestLogin } from './../model/dto/request-login';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${HOST}/empleado`;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(usuario: string, contrasena: string) {
    const body = new RequestLogin();
    body.usuario = usuario;
    body.clave = contrasena;
    console.log('body',body);

    return this.http.post<ResponseLogin>(`${this.url}/ingresar`, body)
    .pipe(
      catchError(this.handleError)
    );
  }
/*
  estaLogeado() {
    let token = sessionStorage.getItem(TOKEN_NAME);
    return token != null;
  }
 */
  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['login']);
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
