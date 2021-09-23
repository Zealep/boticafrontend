import { ReportesService } from './../../service/reportes.service';
import { MatPaginator } from '@angular/material/paginator';
import { ReporteVentas } from './../../model/dto/reporte-ventas';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ParamsReporteVentasDTO } from 'src/app/model/dto/params-reporte-ventas';

@Component({
  selector: 'app-reporte-venta',
  templateUrl: './reporte-venta.component.html',
  styleUrls: ['./reporte-venta.component.scss']
})
export class ReporteVentaComponent implements OnInit {

  reporteVentas: ReporteVentas[] = [];
  dataSource: MatTableDataSource<ReporteVentas>;
  displayedColumns: string[] = ['tipoDocumento', 'cliente','empleado', 'codigo', 'fechaVenta', 'subTotal','descuento','igv','total'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  form: FormGroup = new FormGroup({
    fechaInicio: new FormControl(''),
    fechaFin: new FormControl('')
  });

  constructor(private reproteService:ReportesService) { }

  ngOnInit(): void {
  }


  buscar(){
    let params = new ParamsReporteVentasDTO();
    params.fechaInicio = this.form.get('fechaInicio').value;
    params.fechaFin = this.form.get('fechaFin').value;
    this.reproteService.listVentasByParameters(params).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  export(){
    let params = new ParamsReporteVentasDTO();
    params.fechaInicio = this.form.get('fechaInicio').value;
    params.fechaFin = this.form.get('fechaFin').value;

    this.reproteService.exportarExcelVentas(params)
    .subscribe(result =>{
     const url = window.URL.createObjectURL(result);
     const a = document.createElement('a');
     a.setAttribute('style', 'display:none;');
     document.body.appendChild(a);
     a.href = url;
     a.download = 'reporte-ventas.xls';
     a.click();
     return url;

    });
  }

  validateInputs(){

   if(this.form.get('fechaInicio').value == null ||  this.form.get('fechaFin').value == null){
     alert('Completa los campos obligatorios')
   }

  }
}
