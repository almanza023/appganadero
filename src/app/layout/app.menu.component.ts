import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    items: MenuItem[] = [];

    constructor(public layoutService: LayoutService,
        private router:Router
    ) { }

    ngOnInit() {
        let rol=localStorage.getItem('rol');
        this.items = [
            {
                label: 'Inicio',
                icon: 'pi pi-fw pi-file',
                routerLink: 'dashboard',
            },
        ];

        let configuraciones= {
            label: 'Configuraciones',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Tipo Productos',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: 'tipo-producto',

                },
                {
                    label: 'Tipo Unidad',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: 'tipo-unidad',

                },
                {
                    label: 'Categorías',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: 'categorias',
                },
                {
                    label: 'Usuarios',
                    icon: 'pi pi-fw pi-align-justify',
                    routerLink: 'usuarios',
                },
            ]
        };
        let operaciones=
            {
                label: 'Operaciones',
                icon: 'pi pi-plus',
                items: [

                    {
                        label: 'Productos',
                        icon: 'pi pi-fw pi-align-justify',
                        command: () => this.reloadCurrentRoute('productos')

                    },
                    {
                        label: 'Insumos',
                        icon: 'pi pi-fw pi-align-justify',
                        command: () => this.reloadCurrentRoute('insumos')
                    },
                    {
                        label: 'Aplicaciones',
                        icon: 'pi pi-fw pi-align-justify',
                        command: () => this.reloadCurrentRoute('aplicaciones')
                    },
                    {
                        label: 'Animales',
                        icon: 'pi pi-fw pi-align-justify',
                        command: () => this.reloadCurrentRoute('animales')
                    },
                    {
                        label: 'Compras',
                        icon: 'pi pi-fw pi-align-justify',
                        command: () => this.reloadCurrentRoute('compras')
                    },
                    {
                        label: 'Ventas',
                        icon: 'pi pi-fw pi-align-justify',
                        command: () => this.reloadCurrentRoute('ventas')
                    },
                    {
                        label: 'Reportes',
                        icon: 'pi pi-fw pi-align-justify',
                        command: () => this.reloadCurrentRoute('reportes')
                    },
                ]
            };


            let perfil =
            {
                label: 'Perfil',
                icon: 'pi pi-users',
                routerLink: 'cambiar-clave',
            };

            let cerrar =
                {
                    label: 'Cerrar Sesión',
                    icon: 'pi pi-sign-out',
                    routerLink: 'auth',
                };

        if(localStorage.getItem('rol') == '1') {
            this.items.push(configuraciones);
            this.items.push(operaciones);
            //this.items.push(reportes);
        }else if (localStorage.getItem('rol') == '2'){
            //this.items.push(operacionesMesa);
            //this.items.push(reportes);
        }
        else if (localStorage.getItem('rol') == '3'){
            //this.items.push(operacionesCaja);
            //this.items.push(reportes);
        }
        this.items.push(perfil);
        this.items.push(cerrar);
    }

    reloadCurrentRoute(route:string){
        this.router.navigateByUrl('/', {skipLocationChange:true}).then(()=>{
            this.router.navigate([route]);
        })
    }

    toggleSubmenu(){
        this.layoutService.onMenuToggle();
    }

}
