import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoUnidadComponent } from './tipo-unidad.component';
import { TipoUnidadRoutingModule } from './tipo-unidad-routing.module';
import { ComponentModule } from 'src/app/shared/components/component.module';




@NgModule({
  declarations: [
    TipoUnidadComponent
  ],
  imports: [
    CommonModule,
    ComponentModule,
    TipoUnidadRoutingModule
  ]
})
export class TipoUnidadModule { }
