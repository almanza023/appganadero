import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { Venta } from 'src/app/core/interface/Venta';
import { DetalleVenta } from 'src/app/core/interface/DetalleVenta';
import { VentasService } from 'src/app/core/services/ventas.service';
import { SelectorEtapaComponent } from 'src/app/shared/components/selector-etapa/selector-etapa.component';
import { AnimalService } from 'src/app/core/services/animal.service';
import { EtapasService } from 'src/app/core/services/etapas.service';


@Component({
    selector: 'app-registro-ventas',
    templateUrl: './registro-ventas.component.html',
    providers: [MessageService, ConfirmationService],
})
export class RegistroVentasComponent implements OnInit {
    venta: Venta = {};
    detalleVenta: DetalleVenta = {};
    today:any; // Inicializa la variable today con la fecha actual
    venta_id:string="";
    id:string="";
    ventaCreada:boolean=false;
    totalventa:any=0;
    totalcantidad:any=0;
    detalles:any=[];
    infoPedido:any=[];
    displayDialog:boolean=false;
    historialDialog:boolean=false;
    historialAplicaciones:any=[];

    constructor(
        private animalService: AnimalService,
        private service: VentasService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService
    ) {}
    ngOnInit() {
        this.detalleVenta.animal={};
        this.id = this.route.snapshot.paramMap.get('id');
        this.venta_id = this.route.snapshot.paramMap.get('id');
        this.today = this.formatDate(new Date());
        if(this.venta_id=='0'){
            this.venta_id="";
            this.getCodigo();
        }else{
            setTimeout(() => {
                this.getVenta(this.venta_id);
            }, 1500);
        }

    }

    getCodigo(){
        this.service.getCodigo()
        .pipe(finalize(() => this.getVentaByNumero(this.venta.codigo)))
        .subscribe(
            (response) => {
                //console.log(response.data);
             this.venta.codigo=response.data;
             this.venta.estado=0;
            },
            (error) => {
                this.venta.codigo=''
            }
        );
    }

    formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }


    agergarDetalle(item: DetalleVenta) {
        if (item.peso <= 0 || item.peso ==undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'El Peso es obligatorio',
                life: 3000
            });
            return;
        }
        if (item.valorkg <= 0 || item.valorkg ==undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'El valor es obligatorio',
                life: 3000
            });
            return;
        }
        if (item.valor <= 0 || item.valor ==undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'El total es obligatorio',
                life: 3000
            });
            return;
        }
        this.crearDetalle(this.detalleVenta);


    }

    quitarProducto(detalle_id:any) {
this.confirmationService.confirm({
    message: '¿Está seguro de eliminar este producto?',
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        this.service.deleteDetalleById(detalle_id)
        .pipe(finalize(() => this.getVenta(this.venta_id)))
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
    },
    reject: (type) => {
        switch(type) {
            case ConfirmEventType.REJECT:
                this.messageService.add({
                    severity: 'info',
                    summary: 'Cancelado',
                    detail: 'Eliminación cancelada'
                });
                break;
            case ConfirmEventType.CANCEL:
                this.messageService.add({
                    severity: 'info',
                    summary: 'Cancelado',
                    detail: 'Eliminación cancelada'
                });
                break;
        }
    }
});

    }

    calcularTotal() {
        if (this.detalles && this.detalles.length > 0) {
            this.totalventa = this.detalles.reduce(
                (total, detalle) => Number(total) + Number(detalle.subtotal),
                0
            );
            this.totalcantidad = this.detalles.length;
            return this.totalventa;
        }
        return 0;
    }

    getVenta(numero:any) {
        this.service.getById(numero)
        .pipe(finalize(() => this.mapearDatos()))
        .subscribe(
            (response) => {
                //console.log(response.data);
                this.infoPedido = response.data;
                this.totalcantidad='0';
                this.totalventa='0';
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

    getVentaByNumero(numero:any) {
        if(this.venta_id!=''){
            let data={numero};
            this.service.getByNumero(data)
            .pipe(finalize(() => this.mapearDatos()))
            .subscribe(
                (response) => {
                    //console.log(response.data);
                   if(response.isSuccess){
                    this.infoPedido = response.data;
                   }else{
                    this.infoPedido={};
                   }
                    this.totalcantidad='0';
                    this.totalventa='0';
                },
                (error) => {

                }
            );
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    crearVenta() {
        this.venta.fecha=this.today;
        this.service.postData(this.venta)
        .subscribe(
            (response) => {
                if (response.isSuccess == true) {
                    this.ventaCreada=true;
                    this.venta_id=response.data.id;
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

    crearDetalle(item:any) {
        this.service.postDetalles(item)
        .subscribe(
            (response) => {
                let severity = '';
                let summary = '';
                if (response.isSuccess == true) {
                    severity = 'success';
                    summary = 'Exitoso';
                    this.detalles=response.data;
                    this.displayDialog = false;
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
                    severity: 'error',
                    summary: 'Advertencia',
                    detail: 'Error al Agregar Productos',
                    life: 3000,
                });
            }
        );
    }

    agregarDetalle(){
        if(this.venta.codigo==''){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Número de Venta',
                life: 3000,
            });
            return;
        }

        if(this.venta.comprador=='' || this.venta.comprador==null){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Comprador',
                life: 3000,
            });
            return;
        }

        if(this.detalleVenta.animal.id==undefined || this.detalleVenta.animal.id==0){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Animal',
                life: 3000,
            });
            return;
        }

        if(this.detalleVenta.peso==undefined || this.detalleVenta.peso==0){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Peso',
                life: 3000,
            });
            return;
        }

        if(this.detalleVenta.valorkg==undefined || this.detalleVenta.valorkg==0){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Valor',
                life: 3000,
            });
            return;
        }
        if(this.detalleVenta.valor==undefined || this.detalleVenta.valor==0){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Total',
                life: 3000,
            });
            return;
        }
        this.detalleVenta.venta_id=Number(this.venta_id);
        if(this.ventaCreada==false){
            this.crearVenta();
        }
        this.crearDetalle(this.detalleVenta);




    }

    mapearDatos(){
        if(this.infoPedido){
        this.venta=this.infoPedido.venta;
        this.venta_id=this.infoPedido.venta.id;
        this.ventaCreada=true;
        this.detalles=this.infoPedido.detalles;
        }
    }

    finalizarVenta() {

    this.venta.total=this.totalventa;

    this.service.putData(this.venta_id, this.venta).subscribe(
        (response) => {
            let severity = '';
            let summary = '';
            if (response.isSuccess) {
                severity = 'success';
                summary = 'Venta finalizada con éxito';
                this.getVenta(this.venta_id);
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
}

cancelarFinalizarPedido() {
    this.displayDialog = false; // Cerrar el diálogo de confirmación
}
confirm1() {
    if(this.detalles.length==0){
        this.messageService.add({
            severity: 'warn',
            summary: 'Advertencia',
            detail: 'Debe ingresar al menos un animal',
            life: 3000,
        });
        return;
    }
    this.confirmationService.confirm({
        message: '¿Está seguro de Finalizar la Venta?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Aceptar', // Texto del botón Aceptar
        rejectLabel: 'Cancelar', // Texto del botón Cancelar
        accept: () => {
            this.finalizarVenta();
        },
        reject: (type) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    break;
                case ConfirmEventType.CANCEL:
                    break;
            }
        }
    });
}


actualizarPedido() {
    location.reload(); // Recargar la página
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
