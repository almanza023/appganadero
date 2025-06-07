import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription, finalize } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ProductosService } from 'src/app/core/services/productos.service';
import { AperturaCajaService } from 'src/app/core/services/apertura-caja.service';
import { Router } from '@angular/router';
import { EstadisticaService } from 'src/app/core/services/estadistica.service';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [MessageService],
})
export class DashboardComponent implements OnInit {


    cantidadAnimales: number = 0;
    cantidadVentas: number = 0;
    totalCompras: number = 0;
    totalVentas: number = 0;
    rol = localStorage.getItem('rol');
    constructor(
         public layoutService: LayoutService,
         public messageService: MessageService,
         public estadisticaService: EstadisticaService,
         private router: Router,
         ) {

    }

    ngOnInit() {
        this.getEstadisticas();
    }
    getEstadisticas(){
        this.estadisticaService.getEstadisticas().subscribe((res:any) => {
            console.log(res);
            this.cantidadAnimales = res.data.cantidadAnimales;
            this.cantidadVentas = res.data.cantidadVentas;
            this.totalCompras = res.data.totalCompras;
            this.totalVentas = res.data.totalVentas;
        })
    }







}
