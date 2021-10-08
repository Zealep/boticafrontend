import { Categoria } from './categoria';
export class Producto{
    idProducto: number;
    categoria: Categoria;
    codigo: string;
    nombre: string;
    descripcion: string;
    stock: number;
    stockMinimo: number;
    precioVenta: number;
    fechaElaboracion: Date;
    fechaVencimiento: Date;
    laboratorio: string;
    nombreComercial: string;

}
