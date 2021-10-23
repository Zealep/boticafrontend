import { Producto } from './../../model/producto';
import { GastoService } from './../../service/gasto.service';
import { VentaService } from './../../service/venta.service';
import { SingleBarra } from './../../model/dto/single-barra';
import { ReporteMes } from './../../model/dto/reporte-mes';
import { ReportesService } from './../../service/reportes.service';
import { CompraService } from './../../service/compra.service';
import { ProductoService } from './../../service/producto.service';
import { DetalleCompra } from 'src/app/model/detalle-compra';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ViewProductosComponent } from './view-productos/view-productos.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stockMinimos: Producto[] = [];
  noStocks: Producto[] = [];
  expirateThreeMonths: Producto[] = [];
  topSalesSixMonths: Producto[] = [];
  stockMinimoSize: number;
  noStockSize: number;
  expirateThreeMonthsSize: number;
  topSalesSixMonthsSize: number;
  todayVentas: number;
  todayCompras: number;
  todayGastos: number;
  comprasLastWeekSize: number;
  comprasLastMonthSize: number;
  comprasLastWeek: DetalleCompra[] = [];
  comprasLastMonth: DetalleCompra[] = [];

  pieResults: any[] = [];
  viewPie: any;
  barraResults: any[] = [];
  viewBarra: any;
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Meses';
  showYAxisLabel = true;
  yAxisLabel = 'S/. Ventas';

  colorScheme = {
    domain: ['#90caf9', '#9fa8da', '#80cbc4']
  };

  constructor(private productoService: ProductoService,
    private compraService: CompraService,
    private ventaService: VentaService,
    private gastoService: GastoService,
    private reporteService: ReportesService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStockMinimos();
    this.getNoStock();
    this.getComprasLastMonth();
    this.getComprasLastWeek();
    this.getVentasTotalMeses();
    this.getHoyCompras();
    this.getHoyGastos();
    this.getHoyVentas();
    this.getExpirateThreeMonths();
    this.getTopSixMonths();
  }

  onSelect(event) {
  }

  getStockMinimos() {
    this.productoService.getStockMinimos().subscribe(x => {
      this.stockMinimos = x;
      this.stockMinimoSize = this.stockMinimos.length;
    })
  }

  getNoStock() {
    this.productoService.getNoStock().subscribe(x => {
      this.noStocks = x;
      this.noStockSize = this.noStocks.length;
    })
  }

  getComprasLastWeek() {
    this.compraService.getLastWeek().subscribe(x => {
      this.comprasLastWeek = x;
      this.comprasLastWeekSize = this.comprasLastWeek.length;
    })
  }

  getComprasLastMonth() {
    this.compraService.getLastMonth().subscribe(x => {
      this.comprasLastMonth = x;
      this.comprasLastMonthSize = this.comprasLastMonth.length;
    })
  }

  getVentasTotalMeses() {
    this.reporteService.getVentasTotalesMes()
      .subscribe(result => {
        this.barraResults = this.convertPagoDTOtoSingleBarra(result);
        this.viewBarra = of(this.barraResults);
      })
  }

  getHoyVentas() {
    this.ventaService.getHoy().subscribe(x => {
      this.todayVentas = x;
    })
  }

  getHoyCompras() {
    this.compraService.getHoy().subscribe(x => {
      this.todayCompras = x;
    })
  }

  getHoyGastos() {
    this.gastoService.getHoy().subscribe(x => {
      this.todayGastos = x;
    })
  }

  getExpirateThreeMonths(){
    this.productoService.getExpirateThreeMonths().subscribe(x=>{
      this.expirateThreeMonths = x;
      this.expirateThreeMonthsSize = this.expirateThreeMonths.length;
    })
  }

  getTopSixMonths(){
    this.productoService.getTopSixMonths().subscribe(x=>{
      this.topSalesSixMonths = x;
      this.topSalesSixMonthsSize = this.topSalesSixMonths.length;
    })
  }

  openDialogStockMinimo() {

    const dialogRef = this.dialog.open(ViewProductosComponent, {
      width: '800px',
      data: {
        list: this.stockMinimos
      }
    });

  }
  openDialogSinStock() {

    const dialogRef = this.dialog.open(ViewProductosComponent, {
      width: '800px',
      data: {
        list: this.noStockSize
      }
    });

  }

  openDialogPorVencer() {

    const dialogRef = this.dialog.open(ViewProductosComponent, {
      width: '800px',
      data: {
        list: this.expirateThreeMonths
      }
    });

  }
  openDialogTop() {

    const dialogRef = this.dialog.open(ViewProductosComponent, {
      width: '800px',
      data: {
        list: this.topSalesSixMonths
      }
    });

  }


  convertPagoDTOtoSingleBarra(reporte: ReporteMes[]) {
    let datos: any[] = [];
    reporte.forEach(x => {
      let single = new SingleBarra();
      single.name = x.fecha;
      single.value = x.total;
      datos.push(single);
    })

    return datos;
  }

}
