
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';



@Injectable({
  providedIn: 'root'
})
export class PdfService {

constructor(private http: HttpClient) {}

generatePdfFromArray(data: any[], fileName: string = 'reporte_individual.pdf'): void {
const doc = new jsPDF();
// Filtrar solo las propiedades que no son arrays
const nonArrayKeys = Object.keys(data[0] || {}).filter(
    key => !Array.isArray(data[0][key])
);

// Convertir los datos a un arreglo de pares clave-valor para mostrar en dos columnas por fila
const rows = nonArrayKeys.map(key => {
    const value = data[0][key];
    // Si es un número, aplicar formato con separador de miles
    const formattedValue = typeof value === 'number' ? value.toLocaleString('es-CO') : value;
    return [key, formattedValue];
});

autoTable(doc, {
    head: [['', '']],
    body: rows,
});

if (data[0]?.insumos && Array.isArray(data[0].insumos) && data[0].insumos.length > 0) {

    autoTable(doc, {
        head: [Object.keys(data[0].insumos[0])],
        body: data[0].insumos.map((row: any) =>
            Object.values(row).map((value: any) =>
                typeof value === 'number' ? value.toLocaleString('es-CO') : value
            )
        ),
    });
}
doc.save(fileName);
}



}
