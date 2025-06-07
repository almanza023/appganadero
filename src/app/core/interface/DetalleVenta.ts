import { Animal } from "./Animal";

export interface DetalleVenta {
    id?: number;
    venta_id?: number;
    animal_id?: number;
    valor?: number;
    valorkg?: number;
    peso?: number;
    edad?: string;
    estado?: number;
    animal?: Animal
}

