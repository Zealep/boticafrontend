import { GastoService } from './../../service/gasto.service';
import { VentaService } from './../../service/venta.service';
import { SingleBarra } from './../../model/dto/single-barra';
import { ReporteMes } from './../../model/dto/reporte-mes';
import { ReportesService } from './../../service/reportes.service';
import { CompraService } from './../../service/compra.service';
import { ProductoService } from './../../service/producto.service';
import { Producto } from 'src/app/model/producto';
import { DetalleCompra } from 'src/app/model/detalle-compra';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stockMinimos: Producto[] = [];
  noStocks: Producto[] = [];
  stockMinimoSize:number;
  noStockSize: number;
  todayVentas: number;
  todayCompras: number;
  todayGastos: number;
  comprasLastWeekSize: number;
  comprasLastMonthSize: number;
  comprasLastWeek: DetalleCompra[] = [];
  comprasLastMonth: DetalleCompra[] = [];

  pieResults: any[] = [];
  viewPie : any;
  barraResults: any[] = [];
  viewBarra : any;
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
    domain: ['#90caf9', '#9fa8da','#80cbc4']
  };

  constructor(private productoService: ProductoService,
    private compraService:CompraService,
    private ventaService:VentaService,
    private gastoService:GastoService,
    private reporteService: ReportesService) { }

  ngOnInit(): void {
    this.getStockMinimos();
    this.getNoStock();
    this.getComprasLastMonth();
    this.getComprasLastWeek();
    this.getVentasTotalMeses();
    this.getHoyCompras();
    this.getHoyGastos();
    this.getHoyVentas();
  }

  onSelect(event) {
  }

  getStockMinimos(){
    this.productoService.getStockMinimos().subscribe(x=>{
        this.stockMinimos = x;
        this.stockMinimoSize = this.stockMinimos.length;
    })
  }

  getNoStock(){
    this.productoService.getNoStock().subscribe(x=>{
      this.noStocks = x;
      this.noStockSize = this.noStocks.length;
    })
  }

  getComprasLastWeek(){
    this.compraService.getLastWeek().subscribe(x=>{
      this.comprasLastWeek = x;
      this.comprasLastWeekSize = this.comprasLastWeek.length;
    })
  }

  getComprasLastMonth(){
    this.compraService.getLastMonth().subscribe(x=>{
      this.comprasLastMonth = x;
      this.comprasLastMonthSize = this.comprasLastMonth.length;
    })
  }

  getVentasTotalMeses(){
    this.reporteService.getVentasTotalesMes()
    .subscribe(result=>{
      this.barraResults = this.convertPagoDTOtoSingleBarra(result);
      this.viewBarra = of(this.barraResults);
    })
  }

  getHoyVentas(){
    this.ventaService.getHoy().subscribe(x=>{
      this.todayVentas = x;
    })
  }

  getHoyCompras(){
    this.compraService.getHoy().subscribe(x=>{
      this.todayCompras = x;
    })
  }

  getHoyGastos(){
    this.gastoService.getHoy().subscribe(x=>{
      this.todayGastos = x;
    })
  }


  convertPagoDTOtoSingleBarra(reporte:ReporteMes[]){
    let datos:any[] = [];
    reporte.forEach(x=>{
      let single = new SingleBarra();
      single.name = x.fecha;
      single.value = x.total;
      datos.push(single);
    })

    return datos;
  }

}
