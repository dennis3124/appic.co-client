import {NgModule} from '@angular/core';
import {ExploreRoutingModule} from './explore-routing.module';
import {RouterModule} from '@angular/router';
import {ExploreComponent} from './components/explore.component';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    ExploreRoutingModule,
    RouterModule,
    CommonModule,
    InfiniteScrollModule,

  ],
  exports: [],
  declarations: [
    ExploreComponent
  ]
})

export class ExploreModule {
}
