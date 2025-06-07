import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoUnidadComponent } from './tipo-unidad.component';


const routes: Routes = [{ path: '', component: TipoUnidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoUnidadRoutingModule { }
