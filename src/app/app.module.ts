import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {AuthModule} from './auth-module/auth.module';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core-module/core.module';


@NgModule({
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    CoreModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
