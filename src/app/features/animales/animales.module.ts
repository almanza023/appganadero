import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';


import { AnimalesComponent } from './animales.component';
import { AnimalesRoutingModule } from './animales-routing.module';




@NgModule({
  declarations: [
    AnimalesComponent
  ],
  imports: [
    CommonModule,
    ComponentModule,
    AnimalesRoutingModule
  ]
})
export class AnimalesModule { }
