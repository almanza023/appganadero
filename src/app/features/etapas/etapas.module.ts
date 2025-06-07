import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';

import { EtapasComponent } from './etapas.component';
import { EtapasRoutingModule } from './etapas-routing.module';



@NgModule({
  declarations: [
    EtapasComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    EtapasRoutingModule
  ]
})
export class EtapasModule { }
