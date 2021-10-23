import { ImprimirComponent } from './imprimir/imprimir.component';
import { ProductoDTO } from './../../model/dto/producto-list';
import { element } from 'protractor';
import { ImprimirDTO } from './../../model/dto/imprimir';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ConfirmDialogModel } from './../../shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from './../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VentaService } from './../../service/venta.service';
import { MatPaginator } from '@angular/material/paginator';
import { Venta } from './../../model/venta';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  list: Venta[] = [];
  listProd: ProductoDTO[] = [];
  displayedColumns: string[] = [ 'cliente', 'codigo','fecha','subtotal','igv','total','acciones'];
  dataSource: MatTableDataSource<Venta>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ventaService: VentaService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute ,
    private dialog: MatDialog,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.load();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private load(){
    this.ventaService.getAll().subscribe(data => {
      let ventas = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(ventas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delete(venta: Venta){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Anular Venta',
        message: 'Deseas anular la venta?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(venta);
        }
      });
  }

  private sendDeleteRequest(venta: Venta) {
    this.ventaService.eliminar(venta.idVenta)
    .subscribe(response => {
      this.load();
      this.snackBar.open('Venta anulada', 'Cerrar', {
        duration: 3000
      });
    });
  }

  callEdit(idVenta: number){
    this.router.navigate(['/pages/venta/form',{sell:idVenta}]);
  }

  view(row:any){
    console.log('row',row);
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      width: '800px',
      data:{idVenta:row.idVenta}
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
        }
      });
  }

  print(element:Venta){

    let imprimir = new ImprimirDTO();
    imprimir.cliente = element.nombreCliente;
    imprimir.igv = element.igv;
    imprimir.numero = element.codigoLargo;
    imprimir.subtotal = element.subTotal;
    imprimir.total = element.total;


    element.detallesVenta.forEach(x => {
      let producto = new ProductoDTO();
      producto.prod = x.producto.nombre;
      producto.cant = x.cantidad;
      producto.precio = x.precio;
      producto.total = x.total;
      this.listProd.push(producto);
    })

    imprimir.productoList = this.listProd;

    console.log('IMPRIMIR', imprimir);
    const dialogRef = this.dialog.open(ImprimirComponent, {
      data: {
        imprimir: imprimir
      }
    });
  }


}

