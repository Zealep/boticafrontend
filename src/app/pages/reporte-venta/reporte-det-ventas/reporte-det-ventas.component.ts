import { ParamsReporteVentasDTO } from './../../../model/dto/params-reporte-ventas';
import { ReportesService } from './../../../service/reportes.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReporteDetalleVentas } from './../../../model/dto/reporte-det-ventas';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reporte-det-ventas',
  templateUrl: './reporte-det-ventas.component.html',
  styleUrls: ['./reporte-det-ventas.component.scss']
})
export class ReporteDetVentasComponent implements OnInit {

  reporteDetalleVentas: ReporteDetalleVentas[] = [];
  dataSource: MatTableDataSource<ReporteDetalleVentas>;
  displayedColumns: string[] = ['cliente','empleado', 'codigo', 'fechaVenta', 'categoria','producto','precio','cantidad','total'];

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
    this.reproteService.listDetalleVentasByParameters(params).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  export(){
    let params = new ParamsReporteVentasDTO();
    params.fechaInicio = this.form.get('fechaInicio').value;
    params.fechaFin = this.form.get('fechaFin').value;

    this.reproteService.exportarExcelDetalleVentas(params)
    .subscribe(result =>{
     const url = window.URL.createObjectURL(result);
     const a = document.createElement('a');
     a.setAttribute('style', 'display:none;');
     document.body.appendChild(a);
     a.href = url;
     a.download = 'reporte-detalle-ventas.xls';
     a.click();
     return url;

    });
  }

}

