import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Insumo } from 'src/app/core/interface/Insumo';
import { InsumosService } from 'src/app/core/services/insumos.service';
import { SelectorProductoComponent } from 'src/app/shared/components/selector-producto/selector-producto.component';
import { RegistroProductoComponent } from 'src/app/shared/components/registro-producto/registro-producto.component';


@Component({
    selector: 'app-insumos',
    templateUrl: './insumos.component.html',
    providers: [MessageService],
})
export class InsumosComponent {
    loading: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;
    insumoDialog: boolean = false;
    insumo: Insumo = {};
    historialDialog: boolean = false;
    historialAplicaciones: any[] = [];

    data: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];
    nombreModulo: string = 'Módulo de Insumos';

    //Filtros
    fechaInicial:any;
    fechaFinal:any;

    @ViewChild(SelectorProductoComponent) selectorProducto: SelectorProductoComponent | undefined;
    @ViewChild(RegistroProductoComponent) registroProducto: RegistroProductoComponent | undefined;
    constructor(
        private service: InsumosService,
        private router: Router,
        private messageService: MessageService
    ) {}



    ngOnInit() {
        this.getDataAll();
        this.cols = [ ];
        this.statuses = [];
    }

    getDataAll() {
      this.loading=true;
      this.data=[];
       setTimeout(() => {
        this.service.getAll().subscribe(
            (response) => {
                //console.log(response.data);
                if(response.isSuccess){
                    this.data = response.data;
                }else{
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: response.message,
                        life: 3000,
                    });
                }
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
        this.loading = false;
       }, 1000);
    }

    buscar(){
        let data={
            fecha_inicio:this.fechaInicial,
            fecha_fin:this.fechaFinal,

        }
        this.loading=true;
        this.data=[];
        setTimeout(() => {
        this.service.postFilter(data)
        .subscribe(
            (response) => {
                if(response.isSuccess){
                    this.data = response.data;
                }else{
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: response.message,
                        life: 3000,
                    });
                }
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Advertencia',
                    detail: "Error al Consultar datos",
                    life: 3000,
                });
            }
        );
        this.loading = false;
       }, 1000);
    }

    openNew() {
      this.insumoDialog = true;
      this.insumo = {};
    }

    openNewProducto(){
        this.registroProducto.visible=true;
    }
    getProductos(event:any){
        this.selectorProducto.getData();
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }


    bloqueoInsumo(insumo: any) {
        this.deleteProductDialog = true;
        this.insumo = { ...insumo };

    }
    editInsumo(insumo: any) {
        this.insumoDialog = true;
        this.insumo = { ...insumo };
        this.selectorProducto.filtrar(this.insumo.id_producto)

    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.service
            .postEstado(this.insumo.id)
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
        this.insumo = {};
    }

    hideInsumoDialog() {
        this.insumoDialog = false;
        this.insumo = {};
    }




    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    saveInsumo() {
        if(this.insumo.producto==undefined){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe seleccionar un Producto',
                life: 3000,
            });
            return;
        }

        if(this.insumo.precio==0 || this.insumo.precio==undefined){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un precio',
                life: 3000,
            });
            return;
        }

        if(this.insumo.cantidad==0 || this.insumo.cantidad==undefined){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar una Cantidad',
                life: 3000,
            });
            return;
        }

        if(this.insumo.total==0 || this.insumo.total==undefined){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Total',
                life: 3000,
            });
            return;
        }
        if( this.insumo.destino==undefined){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe seleccionar un destino',
                life: 3000,
            });
            return;
        }
        this.insumo.id_producto=this.insumo.producto?.id;
        if(this.insumo.id){
            this.actualizar();
        }else{
            this.crear();
        }
        this.selectorProducto.reiniciarComponente();


    }

    crear(){
        this.service
            .postData(this.insumo)
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
        this.insumo = {};
    }

    actualizar(){
        this.service
            .putData(this.insumo.id,this.insumo)
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
            this.insumo = {};
    }

    verHistorialAplicaciones(item:any){
        this.historialDialog=true;
        this.historialAplicaciones=[];
        this.service.getHistorialAplicaciones(item.id)
        .subscribe(
            (response) => {
                if(response.isSuccess){
                    this.historialAplicaciones = response.data;
                }else{
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: response.message,
                        life: 3000,
                    });
                }
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



}
