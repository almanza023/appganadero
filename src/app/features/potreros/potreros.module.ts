import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';


import { PotrerosComponent } from './potreros.component';
import { PotrerosRoutingModule } from './potreros-routing.module';




@NgModule({
  declarations: [
    PotrerosComponent
  ],
  imports: [
    CommonModule,
    ComponentModule,
    PotrerosRoutingModule
  ]
})
export class PotrerosModule { }
