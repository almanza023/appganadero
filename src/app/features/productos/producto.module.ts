import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';


import { ProductoComponent } from './productos.component';
import { ProductosRoutingModule } from './productos-routing.module';



@NgModule({
  declarations: [
    ProductoComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ProductosRoutingModule
  ]
})
export class ProductoModule { }
