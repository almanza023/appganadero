import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { ProductosService } from 'src/app/core/services/productos.service';
import { Producto } from 'src/app/core/interface/Producto';
import { RegistroProductoComponent } from 'src/app/shared/components/registro-producto/registro-producto.component';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    providers: [MessageService],
})
export class ProductoComponent {
    productoDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];
    producto: Producto = {};
    selectedProducts: any[] = [];
    editar: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];
    nombreModulo: string = 'Módulo de Productos';

    @ViewChild(RegistroProductoComponent) registroProducto: RegistroProductoComponent | undefined;

    constructor(
        private productoService: ProductosService,
        private messageService: MessageService
    ) {}



    ngOnInit() {
        this.getDataAll();
        this.cols = [ ];
        this.statuses = [];
    }

    getDataAll() {
        this.productoService.getAll().subscribe(
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
        this.producto = {};
        this.registroProducto.visible = true;

    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        this.producto = { ...item };
        this.registroProducto.setProducto(this.producto);
    }

    bloqueoProducto(producto: any) {
        this.deleteProductDialog = true;
        this.producto = { ...producto };
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.productoService
            .postEstado(this.producto.id)
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
        this.producto = {};
    }

    hideDialog() {
        this.productoDialog = false;
        this.editar = false;
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }


}
