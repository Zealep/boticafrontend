import { LoginService } from './../../../service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  apellidos: string;
  nombres: string
  rol: string;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.apellidos = sessionStorage.getItem('apellidos');
    this.nombres = sessionStorage.getItem('nombres');
    this.rol = sessionStorage.getItem('rol');
  }

  salir(){
    this.loginService.cerrarSesion();
  }

}
