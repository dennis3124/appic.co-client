import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    LoginRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule
  ],
  exports: [],
  declarations: [
    LoginComponent
  ]
})

export class LoginModule {}
