import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from './../../../model/producto';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-productos',
  templateUrl: './view-productos.component.html',
  styleUrls: ['./view-productos.component.scss']
})
export class ViewProductosComponent implements OnInit {

  list: Producto[] = [];
  displayedColumns: string[] = [ 'categoria', 'codigo','nombre','nombreComercial','fechaElaboracion','fechaVencimiento','stock','stockMin'];
  dataSource: MatTableDataSource<Producto>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialogRef: MatDialogRef<ViewProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.list = this.data.list;
    this.load();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private load(){

      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

  }

}
