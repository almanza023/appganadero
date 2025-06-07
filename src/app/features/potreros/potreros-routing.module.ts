import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PotrerosComponent } from './potreros.component';


const routes: Routes = [{ path: '', component: PotrerosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PotrerosRoutingModule { }
