import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/auth.guard';
import { RoleGuardService } from '../core/role.guard';
import { VendingComponent } from './vending.component';


const routes: Routes = [
  { path: 'deposit', component: VendingComponent, canActivate: [AuthGuardService, RoleGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendingRoutingModule { }
