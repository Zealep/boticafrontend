import { Empleado } from 'src/app/model/empleado';
import { LoginService } from './../../../service/login.service';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'zp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    usuario: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  submit() {
    if(this.form.valid) {
      this.validateLogin(this.form.value);
    }
  }

  private validateLogin(user: Empleado) {
    this.loginService.login(user.usuario,user.clave)
    .pipe(
      catchError(response => {
        console.log('error captcheado lgoin',response);
      this.snackBar.open(response, 'Cerrar', {
        duration: 3000
      });
      // catch & replace
      return EMPTY;
      })
      )
    .subscribe(data =>{
      console.log('data',data);
      if(data.result === '1'){
        sessionStorage.setItem('apellidos', data.usuario.apellidos);
        sessionStorage.setItem('nombres', data.usuario.nombres);
        sessionStorage.setItem('id', data.usuario.idEmpleado.toString());
        this.router.navigate(['pages']);
      }
      else{
        this.snackBar.open('Usuario o clave incorrecto', 'Cerrar', {
          duration: 3000
        });
      }
    });

  }
}
