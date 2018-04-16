import {NgModule} from '@angular/core';
import {UserComponent} from './user.component';
import {UserRoutingModule} from './user-routing.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
  ],
  exports: [
    UserComponent
  ],
  declarations: [
    UserComponent
  ]
})

export class UserModule {}
