import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';

import { InsumosComponent } from './insumos.component';
import { InsumosRoutingModule } from './insumos-routing.module';

@NgModule({
  declarations: [
    InsumosComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    InsumosRoutingModule
  ]
})
export class InsumosModule { }
