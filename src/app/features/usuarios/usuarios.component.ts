import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from 'src/app/core/interface/Usuario';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    providers: [MessageService],
})
export class UsuariosComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];

    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];
    editar: boolean = false;
    usuario: Usuario = {};

    nombreModulo: string = 'Módulo de Usuarios';
    roles: any[] = [];
    rol: any = {};

    constructor(
        private usuarioService: UsuarioService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.getDataAll();
        this.cols = [];
        this.statuses = [];
        this.roles = [
            { id: 1, descripcion: 'ADMINISTRADOR' },
            { id: 2, descripcion: 'REGULAR' },
        ];
    }

    getDataAll() {
        this.usuarioService.getAll().subscribe(
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
        this.usuario = {};
        this.submitted = false;
        this.clienteDialog = true;
        this.seleccionado = {};
        this.editar = false;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        //console.log(item)
        this.usuario = { ...item };
        this.clienteDialog = true;
        this.editar = true;
        this.filtrar(this.usuario.rol);
    }

    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.usuario = { ...cliente };
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.usuarioService
            .postEstado(this.usuario.id)
            .pipe(finalize(() => this.getDataAll()))
            .subscribe(
                (response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Exitoso',
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
        this.usuario = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;


        if (this.usuario.name == undefined || this.usuario.name == '') {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Nombre',
                life: 3000,
            });
            return;
        }
        if (this.usuario.username == undefined && this.usuario.username == '') {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Usuario',
                life: 3000,
            });
            return;
        }
        if (this.usuario.email == undefined && this.usuario.email == '') {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Email',
                life: 3000,
            });
            return;
        }

        if (this.usuario.rol == undefined && this.usuario.rol == null) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe seleccionar un rol',
                life: 3000,
            });
            return;
        }

        if (this.editar == false) {
            if (this.usuario.password == undefined) {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: 'Debe ingresar una Clave',
                    life: 3000,
                });
                return;
            }
        }
        this.usuario.name = this.usuario.name;
        this.usuario.username = this.usuario.username;
        this.usuario.password = this.usuario.password;
        this.usuario.rol = this.usuario.rol;
        if (this.editar == false) {
            this.crear(this.usuario);
        } else {
            this.actualizar(this.usuario.id, this.usuario);
        }
        this.clienteDialog = false;
        this.usuario = {};
        this.seleccionado = {};
    }

    crear(item: Usuario) {
        this.usuarioService
            .postData(item)
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
    }

    actualizar(id: number, item: Usuario) {
        this.usuarioService
            .putData(id, item)
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
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    onChange(event) {
        this.usuario.rol = event.value.id;
    }

    filtrar(valor: any) {
        if (valor) {
            this.rol = this.roles.find((objeto) => objeto['id'] === valor);
        }
    }
}
