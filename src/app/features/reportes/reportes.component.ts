
import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { PotreroService } from 'src/app/core/services/potrero.service';
import { VentasService } from 'src/app/core/services/ventas.service';
import { PdfService } from 'src/app/core/services/pdf.service';





@Component({
    selector: 'app-reportes',
    templateUrl: './reportes.component.html',
    providers: [MessageService],
})
export class ReportesComponent {
    nombreModulo: string = 'Módulo de Reportes';
    tiposReporte: any[] = [
        { label: 'Reporte Consolidado General', value: '1', animal:false },
        { label: 'Reporte Detallado Por Animal', value: '2', animal:true },
    ];
    tipoReporteSeleccionado: string = '1';
    fechaInicio: Date | null = null;
    fechaFin: Date | null = null;
    loading: boolean = false;
    animal_id:any;
    visible: boolean = false;
    visibleFecha: boolean = true;
    constructor(
        private ventaService: VentasService,
        private pdfService: PdfService,
        private messageService: MessageService
    ) {}

    ngOnInit() {

    }

    cambiarTipoReporte(event){
        this.tipoReporteSeleccionado = event.value;
        if (this.tipoReporteSeleccionado === '2') {
            this.visible = true; // Mostrar el campo de selección de animal
            this.visibleFecha = false; // Ocultar el campo de fechas
        } else {
            this.visible = false; // Ocultar el campo de selección de animal
            this.visibleFecha = true; // Mostrar el campo de fechas
        }
    }

    generarReporte(){

        switch (this.tipoReporteSeleccionado) {
            case '1':
                this.getReporteConsolidado();
                break;
            case '2':
                  this.getReporteIndividual();
                break;

            default:
                 this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al generar el reporte.',
                    });
                break;
    }
}

    getReporteConsolidado() {
        if (!this.fechaInicio || !this.fechaFin) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe seleccionar las fechas de inicio y fin.',
            });
            return;
        }
        let data={
            fecha_inicio: this.fechaInicio,
            fecha_fin: this.fechaFin,
        }
        let dataResult:any=[];
        let titulos:any=[];
        titulos = ['Animal','Comprador', 'Vendedor', 'Peso Compra', 'Peso Venta', 'Peso Ganado', 'Valor Kg Compra', 'Valor Kg Venta', 'Valor Kg Ganado', 'Total Compra', 'Total Insumos', 'Total Venta', 'Utilidad'];
        this.loading = true;
        setTimeout(() => {
            this.ventaService
            .reporteConsolidado(
               data
            )
            .pipe(finalize(() => this.exportarExcel(dataResult, 'reporte_consolidado.xlsx', titulos)))
            .subscribe({
                next: (response) => {
                    // Aquí puedes manejar la respuesta del reporte
                    console.log(response);
                    this.loading=false;
                    dataResult = response.data; // Asumiendo que la respuesta contiene los datos del reporte
                    dataResult = dataResult.map((item: any) => ({
                        'Animal': item.animal_numero,
                        'Comprador': item.comprador,
                        'Vendedor': item.vendedor,
                        'Peso Compra': item.peso_compra,
                        'Peso Venta': item.peso_venta,
                        'Peso Ganado': item.peso_dif,
                        'Valor Kg Compra': item.valor_kg_compra,
                        'Valor Kg Venta': item.valor_kg_venta,
                        'Valor Kg Ganado': item.valor_kg_dif,
                        'Total Compra': item.total_compra,
                        'Total Insumos': item.total_insumos,
                        'Total Venta': item.total_venta,
                        'Utilidad': item.utilidad
                    }));
                    console.log(dataResult);
                },
                error: (error) => {
                    console.error(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al generar el reporte.',
                    });
                    this.loading=false;
                },
            });
        }, 1500);
    }

    getReporteIndividual() {
        if (!this.animal_id) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe seleccionar Un Animal.',
            });
            return;
        }
        let data={
            animal_id: this.animal_id,
        }
        let dataResult:any=[];
        let titulos:any=[];
        titulos = ['Animal','Comprador', 'Vendedor', 'Peso Compra', 'Peso Venta', 'Peso Ganado', 'Valor Kg Compra', 'Valor Kg Venta', 'Valor Kg Ganado', 'Total Compra', 'Total Insumos', 'Total Venta', 'Utilidad'];
        this.loading = true;
        setTimeout(() => {
            this.ventaService
            .reporteConsolidadoIndividual(
               data
            )
            .pipe(finalize(() => this.pdfService.generatePdfFromArray(dataResult, 'reporte_individual.pdf',)))
            .subscribe({
                next: (response) => {
                    // Aquí puedes manejar la respuesta del reporte
                    console.log(response);
                    this.loading=false;
                    dataResult = response.data; // Asumiendo que la respuesta contiene los datos del reporte
                    dataResult = dataResult.map((item: any) => ({
                        'Animal': item.animal_numero,
                        'Comprador': item.comprador,
                        'Vendedor': item.vendedor,
                        'Peso Compra': item.peso_compra,
                        'Peso Venta': item.peso_venta,
                        'Peso Ganado': item.peso_dif,
                        'Valor Kg Compra': item.valor_kg_compra,
                        'Valor Kg Venta': item.valor_kg_venta,
                        'Valor Kg Ganado': item.valor_kg_dif,
                        'Total Compra': item.total_compra,
                        'Total Insumos': item.total_insumos,
                        'Total Venta': item.total_venta,
                        'Utilidad': item.utilidad,
                        'insumos':item.insumos.map((insumo: any) => ({
                            'Insumo': insumo.nombre_producto,
                            'Unidad': insumo.nombre_tipo_unidad,
                            'Cantidad': insumo.total_cantidad,
                            'Valor Total': insumo.total_dinero
                        }))
                    }));
                    console.log(dataResult);
                },
                error: (error) => {
                    console.error(error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error al generar el reporte.',
                    });
                    this.loading=false;
                },
            });
        }, 1500);
    }

    exportarExcel(
        data: any[],
        nombreArchivo: string = 'reporte.xlsx',
        columnas: string[] = []
    ) {
        if (!data || data.length === 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'No hay datos para exportar.',
            });
            return;
        }
        import('xlsx').then(xlsx => {
            let exportData = data;
            if (columnas && columnas.length > 0) {
                exportData = data.map((row: any) => {
                    const filtered: any = {};
                    columnas.forEach(col => {
                        filtered[col] = row[col];
                    });
                    return filtered;
                });
            }
            // Formatear los números para mostrar puntos como separador de miles
            const formattedData = exportData.map((row: any) => {
                const formattedRow: any = {};
                Object.keys(row).forEach(key => {
                    const value = row[key];
                    if (typeof value === 'number') {
                        // Formatea el número con puntos como separador de miles y coma decimal
                        formattedRow[key] = value.toLocaleString('es-CO');
                    } else {
                        formattedRow[key] = value;
                    }
                });
                return formattedRow;
            });

            const worksheet = xlsx.utils.json_to_sheet(formattedData);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = nombreArchivo;
            link.click();
            window.URL.revokeObjectURL(link.href);
            this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Datos exportados a Excel correctamente.',
            });
        }).catch(() => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo exportar a Excel.',
            });
        });
    }






}
