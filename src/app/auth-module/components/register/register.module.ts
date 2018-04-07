import {NgModule} from '@angular/core';
import {RegisterComponent} from './register.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    RegisterComponent
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule {}
