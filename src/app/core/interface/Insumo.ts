import { Producto } from "./Producto"

export interface Insumo {
    id?: number
    id_producto?: number
    producto?: Producto
    fecha?: Date
    cantidad?: number
    total_contenido?: number
    contenido_aplicado?: number
    contenido_restante?: number
    precio?: number
    total?: number
    destino?: 'A' | 'F'
    estado?: number
  }
