import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from './../../../service/producto.service';
import { Categoria } from './../../../model/categoria';
import { CategoriaService } from './../../../service/categoria.service';
import { Producto } from './../../../model/producto';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss']
})
export class FormProductoComponent implements OnInit {

  categorias: Categoria[] = []
  idProducto: number;

  form: FormGroup = new FormGroup({
    categoria: new FormControl(''),
    codigo: new FormControl(''),
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    stock: new FormControl(''),
    stockMinimo: new FormControl(''),
    precioVenta: new FormControl(''),
    fechaElaboracion: new FormControl(''),
    fechaVencimiento: new FormControl(''),
    laboratorio: new FormControl(''),
    nombreComercial: new FormControl('')
  });


  constructor(private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idProducto = +this.route.snapshot.paramMap.get('product');
    this.loadProduct(this.idProducto);
    this.listCategorias();
  }

  listCategorias() {
    this.categoriaService.getAll()
      .subscribe(x => {
        this.categorias = x;
      })

  }

  grabar() {
    console.log('form', this.form);

    let producto = new Producto();
    let categoria = new Categoria();
    if (this.idProducto != 0) {
      producto.idProducto = this.idProducto;
    }
    categoria.idCategoria = this.form.get('categoria').value;
    producto.categoria = categoria;
    producto.codigo = this.form.get('codigo').value;
    producto.nombre = this.form.get('nombre').value;
    producto.descripcion = this.form.get('descripcion').value;
    producto.stock = this.form.get('stock').value;
    producto.stockMinimo = this.form.get('stockMinimo').value;
    producto.precioVenta = this.form.get('precioVenta').value;
    producto.fechaElaboracion = this.form.get('fechaElaboracion').value;
    producto.fechaVencimiento = this.form.get('fechaVencimiento').value;
    producto.laboratorio = this.form.get('laboratorio').value;
    producto.nombreComercial = this.form.get('nombreComercial').value;

    if (this.idProducto == 0) {
      this.productoService.save(producto)
        .subscribe(result => {
          this.router.navigate(['/pages/producto']);
          this.snackBar.open('Producto fue registrado', 'Cerrar', {
            duration: 3000
          });
        })
    }
    else {
      this.productoService.update(producto)
        .subscribe(result => {
          this.router.navigate(['/pages/producto']);

          this.snackBar.open('Producto fue actualizado', 'Cerrar', {
            duration: 3000
          });
        })
    }

  }

  loadProduct(id: number) {
    if (id != 0) {
      this.productoService.getById(id)
        .subscribe(r => {
          this.form.controls['categoria'].setValue(r.categoria.idCategoria);
          this.form.controls['codigo'].setValue(r.codigo);
          this.form.controls['nombre'].setValue(r.nombre);
          this.form.controls['descripcion'].setValue(r.descripcion);
          this.form.controls['stock'].setValue(r.stock);
          this.form.controls['stockMinimo'].setValue(r.stockMinimo);
          this.form.controls['precioVenta'].setValue(r.precioVenta);
          this.form.controls['fechaElaboracion'].setValue(r.fechaElaboracion);
          this.form.controls['fechaVencimiento'].setValue(r.fechaVencimiento);
          this.form.controls['laboratorio'].setValue(r.laboratorio);
          this.form.controls['nombreComercial'].setValue(r.nombreComercial);
        })

    }
  }

  cancelar() {
    this.router.navigate(['/pages/producto']);
  }
}
