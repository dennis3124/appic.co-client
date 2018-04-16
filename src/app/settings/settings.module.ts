import {NgModule} from '@angular/core';
import {SettingsRoutingModule} from './settings-routing.module';
import {RouterModule} from '@angular/router';
import {SettingsActivateGuard} from './guards/settings-activate.guard';
import {SettingsComponent} from './components/settings.component';
import {AuthModule} from '../auth-module/auth.module';
import {CommonModule} from '@angular/common';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {AccountComponent} from './components/account/account.component';

@NgModule({
  imports: [
    SettingsRoutingModule,
    RouterModule,
    AuthModule,
    CommonModule
  ],
  providers: [
    SettingsActivateGuard
  ],
  declarations: [
    SettingsComponent,
    AccountComponent,
    EditProfileComponent
  ],
  exports: [
  ],
})

export class SettingsModule {}
