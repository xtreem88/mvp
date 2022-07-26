import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendingComponent } from './vending.component';


const routes: Routes = [
  { path: 'deposit', component: VendingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendingRoutingModule { }
