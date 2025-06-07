import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';

import { AplicacionesComponent } from './aplicaciones.component';
import { AplicacionesRoutingModule } from './aplicaciones-routing.module';



@NgModule({
  declarations: [
    AplicacionesComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    AplicacionesRoutingModule
  ]
})
export class AplicacionesModule { }
