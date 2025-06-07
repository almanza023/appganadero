import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoProductoComponent } from './tipo-producto.component';
import { TipoProductoRoutingModule } from './tipo-producto-routing.module';
import { ComponentModule } from 'src/app/shared/components/component.module';




@NgModule({
  declarations: [
    TipoProductoComponent
  ],
  imports: [
    CommonModule,
    ComponentModule,
    TipoProductoRoutingModule
  ]
})
export class TipoProductoModule { }
