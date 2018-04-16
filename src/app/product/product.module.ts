import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductRoutingModule} from './product-routing.module';
import {ProductComponent} from './components/product.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ProductRoutingModule,
    RouterModule
  ],
  exports: [

  ],
  declarations: [
    ProductComponent
  ],
})

export class ProductModule {}
