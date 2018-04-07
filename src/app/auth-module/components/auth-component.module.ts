import {NgModule} from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {RegisterModule} from './register/register.module';

@NgModule({
  imports: [
    RegisterModule
  ],
  exports: [
    RegisterModule
  ]
})

export class AuthComponentModule {}
