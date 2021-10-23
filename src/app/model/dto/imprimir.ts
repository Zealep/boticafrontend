import { ProductoDTO } from './producto-list';
export class ImprimirDTO{
     numero : string;
     fecha: string;
     hora: string;
     cliente: string;
     subtotal: number;
     igv: number;
     total: number;
     productoList: ProductoDTO[];
}
