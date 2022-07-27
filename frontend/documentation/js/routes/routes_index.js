var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"login","component":"LoginComponent"},{"path":"product","loadChildren":"./modules/product/product.module#ProductModule","canActivate":["AuthGuardService","RoleGuardService"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/modules/product/product-routing.module.ts","module":"ProductRoutingModule","children":[{"path":"","component":"ProductComponent","canActivate":["AuthGuardService","RoleGuardService"]},{"path":"view/:id","component":"ProductViewComponent","canActivate":["AuthGuardService","RoleGuardService"]},{"path":":id/edit","component":"ProductFormsComponent","canActivate":["AuthGuardService","RoleGuardService"]},{"path":"add","component":"ProductFormsComponent","canActivate":["AuthGuardService","RoleGuardService"]}],"kind":"module"}],"module":"ProductModule"}]},{"path":"vending","loadChildren":"./modules/vending/vending.module#VendingModule","canActivate":["AuthGuardService","RoleGuardService"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/modules/vending/vending-routing.module.ts","module":"VendingRoutingModule","children":[{"path":"deposit","component":"VendingComponent","canActivate":["AuthGuardService","RoleGuardService"]}],"kind":"module"}],"module":"VendingModule"}]}],"kind":"module"}]}
