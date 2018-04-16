import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductRoutingModule} from './product-routing.module';
import {ProductComponent} from './components/product.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
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
