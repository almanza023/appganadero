import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtapasComponent } from './etapas.component';


const routes: Routes = [{ path: '', component: EtapasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtapasRoutingModule { }
