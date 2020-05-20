import { ChartModule } from 'angular2-chartjs';
import { InterceptorService } from './services/interceptor.service';
import { AuthService } from './services/auth.service';
import { PhotoService } from './services/photo.service';
import { PaginationComponent } from './shared/pagination.component';
import * as Sentry from "@sentry/browser";
import { AppErrorHandler } from './app-error-handler';
import { VehicleService } from './services/vehicle.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAuthGuard } from './services/admin-auth.guard';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { AuthGuard } from './services/auth.guard';

Sentry.init({
  dsn: "https://5825b3e5e2cf4318a6f485ebd97175dd@o389573.ingest.sentry.io/5227887"
});

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent,
    AdminComponent
  ],
  imports: [
    ToastrModule.forRoot({
      closeButton: true
    }),
    ToastContainerModule,
    ChartModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuard] },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuard] },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard] },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },    
    VehicleService,
    PhotoService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BrowserXhrWithProgress, multi: true },
    ProgressService,     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
