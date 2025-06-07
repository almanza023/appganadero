import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { Compra } from 'src/app/core/interface/Compra';
import { DetalleCompra } from 'src/app/core/interface/DetalleCompra';
import { ComprasService } from 'src/app/core/services/compras.service';
import { SelectorEtapaComponent } from 'src/app/shared/components/selector-etapa/selector-etapa.component';
import { AnimalService } from 'src/app/core/services/animal.service';
import { EtapasService } from 'src/app/core/services/etapas.service';


@Component({
    selector: 'app-registro-compras',
    templateUrl: './registro-compras.component.html',
    providers: [MessageService, ConfirmationService],
})
export class RegistroComprasComponent implements OnInit {
    compra: Compra = {};
    detalleCompra: DetalleCompra = {};
    today:any; // Inicializa la variable today con la fecha actual
    compra_id:string="";
    id:string="";
    compraCreada:boolean=false;
    totalcompra:any=0;
    totalcantidad:any=0;
    detalles:any=[];
    infoPedido:any=[];
    displayDialog:boolean=false;

    constructor(
        private animalService: AnimalService,
        private etapaService: EtapasService,
        private service: ComprasService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService
    ) {}

    @ViewChild(SelectorEtapaComponent) etapaComponent: SelectorEtapaComponent;

    ngOnInit() {
        this.compra.animal={};
        this.compra.etapa={};
        this.id = this.route.snapshot.paramMap.get('id');
        this.compra_id = this.route.snapshot.paramMap.get('id');
        this.today = this.formatDate(new Date());
        if(this.compra_id=='0'){
            this.compra_id="";
            this.getCodigo();
        }else{
            setTimeout(() => {
                this.getCompra(this.compra_id);
            }, 1500);
        }

    }

    getCodigo(){
        this.service.getCodigo()
        .pipe(finalize(() => this.getCompraByNumero(this.compra.numero)))
        .subscribe(
            (response) => {
                //console.log(response.data);
             this.compra.numero=response.data;
             this.compra.estado=0;
            },
            (error) => {
                this.compra.numero=''
            }
        );
    }

    formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }


    agergarDetalle(item: DetalleCompra) {
        if (item.peso <= 0 || item.peso ==undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'El Peso es obligatorio',
                life: 3000
            });
            return;
        }
        if (item.valor <= 0 || item.valor ==undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'El valor es obligatorio',
                life: 3000
            });
            return;
        }
        if (item.total <= 0 || item.total ==undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'El total es obligatorio',
                life: 3000
            });
            return;
        }

        if(item.total>0){
            const detalle = {
                compra_id: this.compra_id,
                animal_id: item.animal_id,
                peso: item.peso,
                valor: item.valor,
                total: item.total,
            };

            this.crearDetalle(detalle);
        }
    }

    quitarProducto(detalle_id:any) {
this.confirmationService.confirm({
    message: '¿Está seguro de eliminar este producto?',
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        this.service.deleteDetalleById(detalle_id)
        .pipe(finalize(() => this.getCompra(this.compra_id)))
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
            this.totalcompra = this.detalles.reduce(
                (total, detalle) => Number(total) + Number(detalle.total),
                0
            );
            this.totalcantidad = this.detalles.length;
            return this.totalcompra;
        }
        return 0;
    }

    getCompra(numero:any) {
        this.service.getById(numero)
        .pipe(finalize(() => this.mapearDatos()))
        .subscribe(
            (response) => {
                //console.log(response.data);
                this.infoPedido = response.data;
                this.totalcantidad='0';
                this.totalcompra='0';
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

    getCompraByNumero(numero:any) {
       if(this.compra_id!=''){
        let data={numero};
        this.service.getByNumero(data)
        .pipe(finalize(() => this.mapearDatos()))
        .subscribe(
            (response) => {
                //console.log(response.data);
                this.infoPedido = response.data;
                this.totalcantidad='0';
                this.totalcompra='0';
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

    crearCompra() {
        this.compra.fechaCompra=this.today;
        console.log(this.compra);
        this.service.postData(this.compra)
        .subscribe(
            (response) => {
                if (response.isSuccess == true) {
                    this.compraCreada=true;
                    this.compra_id=response.data.id;
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



    agregarEtapa() {
        let nombreEtapa=this.compra.etapa.nombre;
        if(nombreEtapa==undefined || nombreEtapa==''){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Nombre de Etapa',
                life: 3000,
            });
            return;
        }
        let etapa={
            nombre:nombreEtapa.toUpperCase()
        }
        this.etapaService.postData(etapa)
        .subscribe(
            (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: 'Etapa Agregada',
                    life: 3000,
                });
                this.etapaComponent.getData();
            },
            (error) => {
               this.messageService.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: 'Error al Agregar Etapa',
                    life: 3000,
                });
            }
        );
        this.compra.etapa.nombre='';
    }

    agregarDetalle(){
        if(this.compra.numero==''){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Número de Compra',
                life: 3000,
            });
            return;
        }
        if(this.compra.animal.nombre==undefined || this.compra.animal.nombre==''){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Nombre de Animal',
                life: 3000,
            });
            return;
        }


        if(this.compra.animal.sexo==undefined || this.compra.animal.sexo==''){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Sexo',
                life: 3000,
            });
            return;
        }

        if(this.compra.animal.etapa ==undefined || this.compra.animal.etapa==''){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar una Etapa',
                life: 3000,
            });
            return;
        }

        if(this.detalleCompra.peso==undefined || this.detalleCompra.peso==0){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Peso',
                life: 3000,
            });
            return;
        }

        if(this.detalleCompra.valor==undefined || this.detalleCompra.valor==0){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Valor',
                life: 3000,
            });
            return;
        }
        if(this.detalleCompra.total==undefined || this.detalleCompra.total==0){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Total',
                life: 3000,
            });
            return;
        }
        this.compra.animal.peso=this.detalleCompra.peso.toString();
        this.detalleCompra.compra_id=Number(this.compra_id);
        this.detalleCompra.numero=this.compra.numero;
        this.detalleCompra.animal=this.compra.animal;
        if(this.compraCreada==false){
            this.crearCompra();
        }
        this.crearDetalle(this.detalleCompra);




    }

    mapearDatos(){
        this.compra.vendedor=this.infoPedido.compra.vendedor;
        this.compra.fechaCompra=this.infoPedido.compra.fechaCompra;
        this.compra.numero=this.infoPedido.compra.numero;
        this.compra.estado=this.infoPedido.compra.estado;
        this.compra_id=this.infoPedido.compra.id;
        this.compraCreada=true;
        this.detalles=this.infoPedido.detalles;
    }

finalizarCompra() {

    this.compra.total=this.totalcompra;

    this.service.putData(this.compra_id, this.compra).subscribe(
        (response) => {
            let severity = '';
            let summary = '';
            if (response.isSuccess) {
                severity = 'success';
                summary = 'Compra finalizada con éxito';
                this.getCompra(this.compra_id);
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
        message: '¿Está seguro de Finalizar la Compra?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Aceptar', // Texto del botón Aceptar
        rejectLabel: 'Cancelar', // Texto del botón Cancelar
        accept: () => {
            this.finalizarCompra();
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

}
