import { ParamsReporteComprasDTO } from './../../../model/dto/params-reporte-compras';
import { ReportesService } from './../../../service/reportes.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ReporteDetalleCompras } from 'src/app/model/dto/reporte-det-compras';

@Component({
  selector: 'app-reporte-det-compras',
  templateUrl: './reporte-det-compras.component.html',
  styleUrls: ['./reporte-det-compras.component.scss']
})
export class ReporteDetComprasComponent implements OnInit {

  reporteDetalleCompras: ReporteDetalleCompras[] = [];
  dataSource: MatTableDataSource<ReporteDetalleCompras>;
  displayedColumns: string[] = ['tipoDocumento', 'proveedor','empleado', 'codigo', 'fechaCompra', 'categoria','producto','precio','cantidad','total'];

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
    let params = new ParamsReporteComprasDTO();
    params.fechaInicio = this.form.get('fechaInicio').value;
    params.fechaFin = this.form.get('fechaFin').value;

    this.reproteService.listDetalleComprasByParameters(params).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  export(){
    let params = new ParamsReporteComprasDTO();
    params.fechaInicio = this.form.get('fechaInicio').value;
    params.fechaFin = this.form.get('fechaFin').value;

    this.reproteService.exportarExcelDetalleCompras(params)
    .subscribe(result =>{
     const url = window.URL.createObjectURL(result);
     const a = document.createElement('a');
     a.setAttribute('style', 'display:none;');
     document.body.appendChild(a);
     a.href = url;
     a.download = 'reporte-detalle-compras.xls';
     a.click();
     return url;

    });
  }
}

