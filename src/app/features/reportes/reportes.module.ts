import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { ReportesComponent } from './reportes.component';
import { reportesRoutingModule } from './reportes-routing.module';




@NgModule({
  declarations: [
    ReportesComponent
  ],
  imports: [
    CommonModule,
    ComponentModule,
    reportesRoutingModule
  ]
})
export class ReportesModule { }
