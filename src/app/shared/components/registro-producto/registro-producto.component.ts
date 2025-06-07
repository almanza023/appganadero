
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { Producto } from 'src/app/core/interface/Producto';
import { ProductosService } from 'src/app/core/services/productos.service';
import { SelectorTipoProductoComponent } from '../selector-tipo-producto/selector-tipo-producto.component';
import { SelectorTiPoUnidadComponent } from '../selector-tipo-unidad/selector-tipo-unidad.component';

@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.component.html',
  providers: [MessageService],
})
export class RegistroProductoComponent {

  visible:boolean=false;
  producto:Producto={};
  data:any=[];



  @Output() itemSeleccionado:EventEmitter<any> =new EventEmitter<any>();
  @ViewChild(SelectorTipoProductoComponent) selectorTipoProducto: SelectorTipoProductoComponent | undefined;
  @ViewChild(SelectorTiPoUnidadComponent) selectorTipoUnidad: SelectorTiPoUnidadComponent | undefined;
  selectedCliente:string="";
  constructor(private service: ProductosService,
    private messageService: MessageService) { }

  ngOnInit(): void {




  }

  setProducto(producto:Producto){
    this.visible=true;
    this.producto=producto;

    if(this.producto.id_tipo_producto != undefined){
        this.selectorTipoProducto.filtrar(this.producto.id_tipo_producto);
    }
    if(this.producto.id_tipo_unidad != undefined){
        this.selectorTipoUnidad.filtrar(this.producto.id_tipo_unidad);
    }
  }
  getDataAll() {
    this.service.getAll().subscribe(
        (response) => {
            //console.log(response.data);
            this.data = response.data;
            this.itemSeleccionado.emit(this.data);
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
  saveProduct() {
          if (this.producto.nombre == undefined || this.producto.nombre == '') {
              this.messageService.add({
                  severity: 'warn',
                  summary: 'Advertencia',
                  detail: 'Debe ingresar un Nombre',
                  life: 3000,
              });
              return;
          }
          if (this.producto.contenido == undefined || this.producto.contenido == '') {
              this.messageService.add({
                  severity: 'warn',
                  summary: 'Advertencia',
                  detail: 'Debe ingresar un Contenido',
                  life: 3000,
              });
              return;
          }
          if (this.producto.id_tipo_producto == undefined || this.producto.id_tipo_producto == 0) {
              this.messageService.add({
                  severity: 'warn',
                  summary: 'Advertencia',
                  detail: 'Debe seleccionar un Tipo Producto',
                  life: 3000,
              });
              return;
          }
          if (this.producto.id_tipo_unidad == undefined || this.producto.id_tipo_unidad == 0) {
              this.messageService.add({
                  severity: 'warn',
                  summary: 'Advertencia',
                  detail: 'Debe seleccionar un Tipo Unidad',
                  life: 3000,
              });
              return;
          }
          if (this.producto.id == undefined) {
              this.crear(this.producto);
          } else {
              this.actualizar(this.producto.id, this.producto);
          }
          this.visible = false;
          this.producto = {};
          this.selectorTipoProducto?.reiniciarComponente();
          this.selectorTipoUnidad?.reiniciarComponente();

      }

      crear(item: Producto) {
          this.service
              .postData(item)
              .pipe(
                  finalize(() => {
                      this.getDataAll();
                  })
              )
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

      actualizar(id:number, item: Producto) {
          this.service
              .putData(id, item)
              .pipe(
                  finalize(() => {
                      this.getDataAll();
                  })
              )
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



close(){
    this.visible=false;
    this.selectorTipoProducto?.reiniciarComponente();
    this.selectorTipoUnidad?.reiniciarComponente();
    this.producto={};
    }








}
