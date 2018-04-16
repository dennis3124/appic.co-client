import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExploreComponent} from './components/explore.component';

const routes: Routes = [
  {path: 'explore', component: ExploreComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class ExploreRoutingModule {}

