import { Empleado } from '../../../model/empleado';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.scss']
})
export class FormEmpleadoComponent implements OnInit {

  form: FormGroup = new FormGroup({
    apellidos: new FormControl(''),
    nombres: new FormControl(''),
    dni: new FormControl(''),
    sexo: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    direccion: new FormControl(''),
    telefono: new FormControl(''),
    celular: new FormControl(''),
    correo: new FormControl(''),
    usuario: new FormControl(''),
    clave: new FormControl(''),
    rol: new FormControl(''),
    fechaIngreso: new FormControl(''),
    sueldo: new FormControl('')
  });

  @Input() title: string;
  @Input() labelSubmit: string;
  @Input()
  set model(m: Empleado){
    if(!m) {
      return;
    }
    this.form.patchValue(m);
  }

  @Output() enviar: EventEmitter<Empleado> = new EventEmitter<Empleado>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }

  ngOnInit():void {
  }

  onSubmit() {
    if(this.form.valid) {
      this.enviar.emit(this.form.value); // Enviamos el modelo de datos: Egreso
    } else {
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
