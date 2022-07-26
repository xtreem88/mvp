import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './modules/core/auth.guard';
import { RoleGuardService } from './modules/core/role.guard';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'product', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule), canActivate: [AuthGuardService, RoleGuardService] },
  { path: 'vending', loadChildren: () => import('./modules/vending/vending.module').then(m => m.VendingModule), canActivate: [AuthGuardService, RoleGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
