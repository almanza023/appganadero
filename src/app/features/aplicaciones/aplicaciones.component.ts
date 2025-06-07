import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { Aplicacion } from 'src/app/core/interface/Aplicacion';
import { SelectorAnimalComponent } from 'src/app/shared/components/selector-animal/selector-animal.component';
import { SelectorInsumosComponent } from 'src/app/shared/components/selector-insumos/selector-insumos.component';
import { AplicacionesService } from 'src/app/core/services/aplicaciones.service';

@Component({
    selector: 'app-aplicaciones',
    templateUrl: './aplicaciones.component.html',
    providers: [MessageService],
})
export class AplicacionesComponent {
    aplicacionDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];
    aplicacion: Aplicacion = {};
    selectedProducts: any[] = [];
    editar: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];
    nombreModulo: string = 'Módulo de Aplicaciones de Insumos';

    @ViewChild(SelectorAnimalComponent) selectorAnimal: SelectorAnimalComponent | undefined;
    @ViewChild(SelectorInsumosComponent) selectorInsumos: SelectorInsumosComponent | undefined;

    constructor(
        private aplicacionService: AplicacionesService,
        private messageService: MessageService
    ) {}



    ngOnInit() {
        this.getDataAll();
        this.cols = [ ];
        this.statuses = [];
    }

    getDataAll() {
        this.aplicacionService.getAll().subscribe(
            (response) => {
                //console.log(response.data);
                this.data = response.data;
            },
            (error) => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: error.error.data,
                    life: 3000,
                });
            }
        );
    }


    openNew() {
        this.aplicacion = {};
        this.aplicacionDialog=true;
        this.selectorAnimal.reiniciarComponente();
        this.selectorInsumos.reiniciarComponente();

    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        this.aplicacion = { ...item };
        this.aplicacionDialog=true;
        this.selectorAnimal.filtrar(this.aplicacion.animal_id);
        this.selectorInsumos.filtrar(this.aplicacion.insumo_id);
    }

    bloqueoProducto(item: any) {
        this.deleteProductDialog = true;
        this.aplicacion = { ...item };
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.aplicacionService
            .postEstado(this.aplicacion.id)
            .pipe(finalize(() => this.getDataAll()))
            .subscribe(
                (response) => {
                    let severity = '';
                    let summary = '';
                    if (response.isSuccess == true) {
                        severity = 'success';
                        summary = 'Exitoso';
                    } else {
                        severity = 'warn';
                        summary = 'Advertencia';
                    }
                    this.messageService.add({
                        severity: severity,
                        summary: summary,
                        detail: response.message,
                        life: 3000,
                    });
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.data,
                        life: 3000,
                    });
                }
            );
        this.aplicacion = {};
    }

    hideAplicacionDialog() {
        this.aplicacionDialog = false;
        this.editar = false;
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    saveAplicacion() {
        if(this.aplicacion.animal_id==undefined){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe seleccionar un Animal',
                life: 3000,
            });
            return;
        }

        if( this.aplicacion.insumo_id==undefined){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe seleccionar un Insumo',
                life: 3000,
            });
            return;
        }

        if(this.aplicacion.cantidad_aplicada==0 || this.aplicacion.cantidad_aplicada==undefined){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar una Cantidad',
                life: 3000,
            });
            return;
        }

        if(this.aplicacion.id){
            this.actualizar();
        }else{
            this.crear();
        }
        this.selectorAnimal.reiniciarComponente();
        this.selectorInsumos.reiniciarComponente();
        this.selectorInsumos.getData();


    }

    crear(){
        this.aplicacionService
            .postData(this.aplicacion)
            .pipe(finalize(() => this.getDataAll()))
            .subscribe(
                (response) => {
                    let severity = '';
                    let summary = '';
                    if (response.isSuccess == true) {
                        severity = 'success';
                        summary = 'Exitoso';
                    } else {
                        severity = 'warn';
                        summary = 'Advertencia';
                    }
                    this.messageService.add({
                        severity: severity,
                        summary: summary,
                        detail: response.message,
                        life: 3000,
                    });
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.data,
                        life: 3000,
                    });
                }
            );
        this.aplicacion = {};
        this.aplicacionDialog=false;

    }

    actualizar(){
        this.aplicacionService
            .putData(this.aplicacion.id,this.aplicacion)
            .pipe(finalize(() => this.getDataAll()))
            .subscribe(
                (response) => {
                    let severity = '';
                        let summary = '';
                        if (response.isSuccess == true) {
                            severity = 'success';
                            summary = 'Exitoso';
                        } else {
                            severity = 'warn';
                            summary = 'Advertencia';
                        }
                        this.messageService.add({
                            severity: severity,
                            summary: summary,
                            detail: response.message,
                            life: 3000,
                        });
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Advertencia',
                            detail: error.error.data,
                            life: 3000,
                        });
                    }
                );
            this.aplicacionDialog=false;
    }


}
