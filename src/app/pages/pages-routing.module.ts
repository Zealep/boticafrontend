import { AnuladasComponent } from './venta/anuladas/anuladas.component';
import { ReporteDetComprasComponent } from './reporte-compra/reporte-det-compras/reporte-det-compras.component';
import { ReporteDetVentasComponent } from './reporte-venta/reporte-det-ventas/reporte-det-ventas.component';
import { ReporteVentaComponent } from './reporte-venta/reporte-venta.component';
import { FormVentaComponent } from './venta/form-venta/form-venta.component';
import { EditProveedorComponent } from './proveedor/edit-proveedor/edit-proveedor.component';
import { AddProveedorComponent } from './proveedor/add-proveedor/add-proveedor.component';
import { FormCompraComponent } from './compra/form-compra/form-compra.component';
import { CompraComponent } from './compra/compra.component';
import { FormProductoComponent } from './producto/form-producto/form-producto.component';
import { ProductoComponent } from './producto/producto.component';
import { EditClienteComponent } from './cliente/edit-cliente/edit-cliente.component';
import { AddClienteComponent } from './cliente/add-cliente/add-cliente.component';
import { ClienteComponent } from './cliente/cliente.component';
import { EditEmpleadoComponent } from './empleado/edit-empleado/edit-empleado.component';
import { AddEmpleadoComponent } from './empleado/add-empleado/add-empleado.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { AddGastoComponent } from './gasto/add-gasto/add-gasto.component';
import { EditTipoDocumentoComponent } from './tipo-documento/edit-tipo-documento/edit-tipo-documento.component';
import { AddTipoDocumentoComponent } from './tipo-documento/add-tipo-documento/add-tipo-documento.component';
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component';
import { EditCategoriaComponent } from './categoria/edit-categoria/edit-categoria.component';
import { AddCategoriaComponent } from './categoria/add-categoria/add-categoria.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GastoComponent } from './gasto/gasto.component';
import { EditGastoComponent } from './gasto/edit-gasto/edit-gasto.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { VentaComponent } from './venta/venta.component';
import { ReporteCompraComponent } from './reporte-compra/reporte-compra.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      //CRUD CATEGORIA
      {
        path: 'categoria',
        component: CategoriaComponent
      },
      {
        path: 'categoria/add',
        component: AddCategoriaComponent
      },
      {
        path: 'categoria/edit/:id',
        component: EditCategoriaComponent
      },
      //CRUD TIPO DOCUMENTO
      {
        path: 'tipo-documento',
        component: TipoDocumentoComponent
      },
      {
        path: 'tipo-documento/add',
        component: AddTipoDocumentoComponent
      },
      {
        path: 'tipo-documento/edit/:id',
        component: EditTipoDocumentoComponent
      },
      //CRUD GASTO
      {
        path: 'gasto',
        component: GastoComponent
      },
      {
        path: 'gasto/add',
        component: AddGastoComponent
      },
      {
        path: 'gasto/edit/:id',
        component: EditGastoComponent
      },
      //CRUD EMPLEADO
      {
        path: 'empleado',
        component: EmpleadoComponent
      },
      {
        path: 'empleado/add',
        component: AddEmpleadoComponent
      },
      {
        path: 'empleado/edit/:id',
        component: EditEmpleadoComponent
      },
      //CRUD CLIENTE
      {
        path: 'cliente',
        component: ClienteComponent
      },
      {
        path: 'cliente/add',
        component: AddClienteComponent
      },
      {
        path: 'cliente/edit/:id',
        component: EditClienteComponent
      },
         //CRUD PROVEEDOR
         {
          path: 'proveedor',
          component: ProveedorComponent
        },
        {
          path: 'proveedor/add',
          component: AddProveedorComponent
        },
        {
          path: 'proveedor/edit/:id',
          component: EditProveedorComponent
        },
         //CRUD PRODUCTO
         {
          path: 'producto',
          component: ProductoComponent
        },
        {
          path: 'producto/form',
          component: FormProductoComponent
        },
         //CRUD COMPRA
         {
          path: 'compra',
          component: CompraComponent
        },
        {
          path: 'compra/form',
          component: FormCompraComponent
        },
           //CRUD VENTA
           {
            path: 'venta',
            component: VentaComponent
          },
          {
            path: 'venta/form',
            component: FormVentaComponent
          },

          {
            path: 'venta-anuladas',
            component: AnuladasComponent
          },

          //REPORTES
          {
            path: 'report-ventas',
            component: ReporteVentaComponent
          },
          {
            path: 'report-ventas-det',
            component: ReporteDetVentasComponent
          },
          {
            path: 'report-compras',
            component: ReporteCompraComponent
          },
          {
            path: 'report-compras-det',
            component: ReporteDetComprasComponent
          },
    ]

  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
