import {NgModule} from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {RegisterModule} from './register/register.module';
import {LoginModule} from './login/login.module';
import {UserModule} from './user/user.module';

@NgModule({
  imports: [
    RegisterModule,
    LoginModule,
    UserModule
  ],
  exports: [
    RegisterModule,
    LoginModule,
    UserModule
  ]
})

export class AuthComponentModule {}
