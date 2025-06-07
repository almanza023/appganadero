import { Animal } from "./Animal";
import { DetalleCompra } from "./DetalleCompra";
import { Etapa } from "./Etapa";

export interface Compra {
    id?: number;
    numero?: string,
	fechaCompra?: string ,
	total?: number,
	totalAnimal?: number,
	vendedor?: string,
	ubicacion?: string,
	tipo?: string,
    estado?: number,
    animal?: Animal    
    etapa?: Etapa,
    detalles?: DetalleCompra[];
	

}

