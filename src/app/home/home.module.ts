import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './components/home.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    InfiniteScrollModule,
  ],
  exports: [],
  declarations: [
    HomeComponent
  ]
})

export class HomeModule {}

