import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VentaService } from './../../../service/venta.service';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleVenta } from './../../../model/detalle-venta';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre','precio', 'cantidad', 'total'];

  dataProductos: MatTableDataSource<DetalleVenta>;
  ventaDetalles: DetalleVenta[] = [];


  constructor(private ventaService: VentaService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.getDetalleVentas();
  }

  getDetalleVentas(){
    console.log('id',this.data.idVenta);
      this.ventaService.getDetailsByVenta(this.data.idVenta).subscribe(x=>{
        this.dataProductos = new MatTableDataSource(x);
      })
  }

  getTotalCost() {
    if(this.dataProductos === null || this.dataProductos === undefined ){
      return;
    }
    return this.dataProductos.data.reduce((summ, v) => summ += v.total, 0);
  }

  getIGV(){
    if(this.dataProductos === null || this.dataProductos === undefined ){
      return;
    }
      let total = this.dataProductos.data.reduce((summ, v) => summ += v.total, 0);
      return total*0.18;
  }

  getSubTotal(){
    if(this.dataProductos === null || this.dataProductos === undefined ){
      return;
    }
      return this.getTotalCost()-this.getIGV();
  }




}
