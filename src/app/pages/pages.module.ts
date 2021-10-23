import { EditClienteComponent } from './cliente/edit-cliente/edit-cliente.component';
import { AddClienteComponent } from './cliente/add-cliente/add-cliente.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria/categoria.component';
import { HttpClientModule } from '@angular/common/http';
import { AddCategoriaComponent } from './categoria/add-categoria/add-categoria.component';
import { EditCategoriaComponent } from './categoria/edit-categoria/edit-categoria.component';
import { FormCategoriaComponent } from './categoria/form-categoria/form-categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component';
import { AddTipoDocumentoComponent } from './tipo-documento/add-tipo-documento/add-tipo-documento.component';
import { EditTipoDocumentoComponent } from './tipo-documento/edit-tipo-documento/edit-tipo-documento.component';
import { FormTipoDocumentoComponent } from './tipo-documento/form-tipo-documento/form-tipo-documento.component';
import { GastoComponent } from './gasto/gasto.component';
import { AddGastoComponent } from './gasto/add-gasto/add-gasto.component';
import { EditGastoComponent } from './gasto/edit-gasto/edit-gasto.component';
import { FormGastoComponent } from './gasto/form-gasto/form-gasto.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { AddEmpleadoComponent } from './empleado/add-empleado/add-empleado.component';
import { EditEmpleadoComponent } from './empleado/edit-empleado/edit-empleado.component';
import { FormEmpleadoComponent } from './empleado/form-empleado/form-empleado.component';
import { ClienteComponent } from './cliente/cliente.component';
import { FormClienteComponent } from './cliente/form-cliente/form-cliente.component';
import { ProductoComponent } from './producto/producto.component';
import { FormProductoComponent } from './producto/form-producto/form-producto.component';
import { CompraComponent } from './compra/compra.component';
import { FormCompraComponent } from './compra/form-compra/form-compra.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { AddProveedorComponent } from './proveedor/add-proveedor/add-proveedor.component';
import { EditProveedorComponent } from './proveedor/edit-proveedor/edit-proveedor.component';
import { FormProveedorComponent } from './proveedor/form-proveedor/form-proveedor.component';
import { DetailsCompraComponent } from './compra/details-compra/details-compra.component';
import { VentaComponent } from './venta/venta.component';
import { DetailsVentaComponent } from './venta/details-venta/details-venta.component';
import { FormVentaComponent } from './venta/form-venta/form-venta.component';
import { ReporteVentaComponent } from './reporte-venta/reporte-venta.component';
import { ReporteCompraComponent } from './reporte-compra/reporte-compra.component';
import { ReporteDetVentasComponent } from './reporte-venta/reporte-det-ventas/reporte-det-ventas.component';
import { ReporteDetComprasComponent } from './reporte-compra/reporte-det-compras/reporte-det-compras.component';
import { AnuladasComponent } from './venta/anuladas/anuladas.component';
import { ViewDetailsComponent } from './venta/view-details/view-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ImprimirComponent } from './venta/imprimir/imprimir.component';
import { ViewProductosComponent } from './dashboard/view-productos/view-productos.component';



@NgModule({
  declarations: [CategoriaComponent, AddCategoriaComponent, EditCategoriaComponent, FormCategoriaComponent, TipoDocumentoComponent, AddTipoDocumentoComponent, EditTipoDocumentoComponent, FormTipoDocumentoComponent, GastoComponent, AddGastoComponent, EditGastoComponent, FormGastoComponent, EmpleadoComponent, AddEmpleadoComponent, EditEmpleadoComponent, FormEmpleadoComponent, ClienteComponent,AddClienteComponent,EditClienteComponent,FormClienteComponent, ProductoComponent, FormProductoComponent, CompraComponent, FormCompraComponent, ProveedorComponent, AddProveedorComponent, EditProveedorComponent, FormProveedorComponent, DetailsCompraComponent, VentaComponent, DetailsVentaComponent, FormVentaComponent, ReporteVentaComponent, ReporteCompraComponent, ReporteDetVentasComponent, ReporteDetComprasComponent, AnuladasComponent, ViewDetailsComponent, DashboardComponent, ImprimirComponent, ViewProductosComponent],
  imports: [
    PagesRoutingModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule

  ]
})
export class PagesModule { }
