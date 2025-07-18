import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';




import { Router } from '@angular/router';
import { ComprasService } from 'src/app/core/services/compras.service';


@Component({
    selector: 'app-compras',
    templateUrl: './compras.component.html',
    providers: [MessageService],
})
export class ComprasComponent {
    loading: boolean = false;
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];
    pedido: any = {};
    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];
    posiciones:any[]=[];
    posicion:any={};
    detalles: any = [];
    totalpedido:any=0;
    totalcantidad:any=0;
    nombreModulo: string = 'Módulo de Compras';

    //Filtros
    fechaInicial:any;
    fechaFinal:any;
    filtroProveedor:any;
    filtroEstado:any;
    estados:any=[
        {id:0 , nombre:"TODOS"},
        {id:1 , nombre:"CREADA"},
        {id:2 , nombre:"FINALIZADA"},
        {id:3 , nombre:"ANULADA"},
    ];


    constructor(
        private service: ComprasService,
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
        if(this.fechaInicial==null || this.fechaFinal==null){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe seleccionar una fecha inicial y final',
                life: 3000,
            });
            return;
        }
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

    openNew(id:any) {
        this.router.navigate(['/compras/registro/'+id]); // Redirigir a la lista de pedidos
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }


    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.pedido = { ...cliente };
        this.pedido.cambio_estado = true;


    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.service
            .postEstado(this.pedido.id)
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
        this.pedido = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    getPedido(pedido_id:any) {
        this.service.getById(pedido_id)
        .subscribe(
            (response) => {
                //console.log(response.data);
                this.clienteDialog=true;
                this.detalles = response.data.detalles;
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

    calcularTotal() {

        this.totalpedido=this.detalles.reduce(
            (total, detalle) => Number(total) + Number(detalle.total),
            0
        );
        return this.totalpedido;
    }




    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }



}
