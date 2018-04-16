import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { AppComponent } from './app.component';
import {AuthModule} from './auth-module/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core-module/core.module';
import {HomeModule} from './home/home.module';
import {ProductModule} from './product/product.module';
import {SharedComponentsModule} from './shared-module/components/shared-components.module';
import {CompanyModule} from './company/company.module';
import {SettingsModule} from './settings/settings.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {ExploreModule} from './explore/explore.module';


@NgModule({
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    CompanyModule,
    InfiniteScrollModule,
    ProductModule,
    SettingsModule,
    DashboardModule,
    ExploreModule,
    SharedComponentsModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
