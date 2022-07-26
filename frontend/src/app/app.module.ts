import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { AppStoreModule } from './store/app-store.module';
import { ApiService } from './repository/api/api.repository';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpHeaders } from './services/helpers/http-headers.service';
import { AppFooterComponent } from './app/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppNavBarComponent } from './app/nav-bar/nav-bar.component';
import {MatButtonModule} from '@angular/material/button';
import { LoginModule } from './modules/login/login.module';
import { AuthGuardService } from './modules/core/auth.guard';
import { VendingService } from './services/vending/vending.service';
import { AppClientHttpInterceptor } from './modules/core/http.interceptor';
import { ProductService } from './services/product/product.service';
import { AppErrorInterceptor } from './modules/core/error.interceptor';
import { UserService } from './services/user/user.service';
import { RoleGuardService } from './modules/core/role.guard';


@NgModule({
  declarations: [
    AppComponent,
    AppFooterComponent,
    AppNavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppStoreModule,
    MatToolbarModule,
    LoginModule,
    MatButtonModule,
  ],
  providers: [AppHttpHeaders, ApiService, ProductService, AuthGuardService, VendingService, UserService, RoleGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AppClientHttpInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: AppErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
