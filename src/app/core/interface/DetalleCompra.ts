import { Animal } from "./Animal";

export interface DetalleCompra {
    id?: number;
    animal_id?: number;
    animal?: Animal;
    compra_id?: number;
    numero?: string;
    valor?: number;
    peso?: number;
    total?: number;
    estado?: number;
}

