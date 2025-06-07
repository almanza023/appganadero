
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos de la plantilla
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from "primeng/multiselect";
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule  } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

import { LoadingComponent } from './loading/loading.component';

import { SelectorEstadoComponent } from './selector-estado/selector-estado.component';

import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { SelectorProveedorComponent } from './selector-proveedor/selector-proveedor.component';
import { SelectorUserComponent } from './selector-user/selector-user.component';
import { TicketposComponent } from './ticketpos/ticketpos.component';
import { TicketAperturaCajaComponent } from './ticket-apertura-caja/ticket-apertura-caja.component';
import { TicketPosDetalleComponent } from './ticketpos-detalle/ticketpos-detalle.component';
import { TickekCierreCajaComponent } from './ticket-cierre-caja/ticket-cierre-caja.component';
import { TicketPosProductosComponent } from './ticketpos-productos/ticketpos-productos.component';
import { SelectorSexoComponent } from './selector-sexo/selector-sexo.component';
import { SelectorEtapaComponent } from './selector-etapa/selector-etapa.component';
import { PanelModule } from 'primeng/panel';
import { SelectorAnimalComponent } from './selector-animal/selector-animal.component';
import { RegistroProductoComponent } from './registro-producto/registro-producto.component';
import { SelectorTipoProductoComponent } from './selector-tipo-producto/selector-tipo-producto.component';
import { SelectorTiPoUnidadComponent } from './selector-tipo-unidad/selector-tipo-unidad.component';
import { SelectorProductoComponent } from './selector-producto/selector-producto.component';
import { SelectorInsumosComponent } from './selector-insumos/selector-insumos.component';


@NgModule({
  declarations: [
    SelectorSexoComponent,
    SelectorEstadoComponent,
    SelectorProveedorComponent,
    LoadingComponent,
    SelectorTiPoUnidadComponent,
    SelectorTipoProductoComponent,
    SelectorUserComponent,
    SelectorEtapaComponent,
    SelectorAnimalComponent,
    SelectorProductoComponent,
    SelectorInsumosComponent,
    RegistroProductoComponent,
    TicketposComponent,
    TicketAperturaCajaComponent, TicketPosDetalleComponent,
    TickekCierreCajaComponent,
    TicketPosProductosComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule, ButtonModule,
    CalendarModule, TableModule,KeyFilterModule,
    ToastModule, RatingModule, MultiSelectModule, SelectButtonModule,RadioButtonModule,
    InputMaskModule, InputNumberModule, InputTextModule, AccordionModule, FileUploadModule,
    DialogModule, TabViewModule, ToolbarModule, InputTextareaModule, CheckboxModule, ConfirmDialogModule,
    PanelModule
  ],
  exports: [
    CommonModule, CheckboxModule, InputMaskModule, InputNumberModule, DropdownModule, InputTextModule,
    FormsModule, ButtonModule, CalendarModule, SelectButtonModule, AccordionModule,
    TableModule, ToastModule, RatingModule, MultiSelectModule,KeyFilterModule,RadioButtonModule, FileUploadModule,
    DialogModule, TabViewModule,
    ToolbarModule, InputTextareaModule, SelectorSexoComponent,SelectorAnimalComponent,RegistroProductoComponent,
    SelectorEtapaComponent,SelectorInsumosComponent,
    SelectorEstadoComponent,SelectorProductoComponent,
    SelectorProveedorComponent, SelectorTipoProductoComponent,
    LoadingComponent, ConfirmDialogModule, SelectorTiPoUnidadComponent,
    SelectorUserComponent,TicketposComponent,
    TicketAperturaCajaComponent, TicketPosDetalleComponent,PanelModule,
    TickekCierreCajaComponent, TicketPosProductosComponent,
  ]
})
export class ComponentModule { }
