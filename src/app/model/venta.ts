import { DetalleVenta } from './detalle-venta';
import { Empleado } from './empleado';
import { Cliente } from './cliente';
import { TipoDocumento } from './tipo-documento';
export class Venta{

    idVenta: number;
    cliente: Cliente;
    empleado: Empleado;
    codigo: string;
    codigoLargo: string;
    fecha: Date;
    subTotal: number;
    descuento: number;
    igv: number;
    total: number;
    detallesVenta: DetalleVenta[];
    nombreCliente: string;
    documento: string;

}
