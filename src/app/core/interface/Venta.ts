import { DetalleVenta } from "./DetalleVenta";

export interface Venta {
    id?: number;
    codigo?: string,
	fecha?: string ,
	total?: number,
	comprador?: string,
	telefono?: string,
	documento?: string,
	tipo?: string,
    estado?: number,
    detalles?: DetalleVenta[];


}

