import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductFormsComponent } from './forms/forms.component';
import { ProductComponent } from './list/product.component';
import { ProductViewComponent } from './view/product.component';


const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: ':id', component: ProductViewComponent },
  { path: ':id/edit-attributes', component: ProductFormsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
