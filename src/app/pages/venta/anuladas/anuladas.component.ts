import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VentaService } from './../../../service/venta.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Venta } from 'src/app/model/venta';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-anuladas',
  templateUrl: './anuladas.component.html',
  styleUrls: ['./anuladas.component.scss']
})
export class AnuladasComponent implements OnInit {
  list: Venta[] = [];
  displayedColumns: string[] = [ 'cliente', 'codigo','fecha','subtotal','igv','total'];
  dataSource: MatTableDataSource<Venta>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ventaService: VentaService,
    private MatSnackBar: MatSnackBar,
    public route: ActivatedRoute ,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private load(){
    this.ventaService.getAnuladas().subscribe(data => {
      let ventas = JSON.parse(JSON.stringify(data));
      this.dataSource = new MatTableDataSource(ventas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


}


