import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from './components/settings.component';
import {SettingsActivateGuard} from './guards/settings-activate.guard';
import {AccountComponent} from './components/account/account.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  /* Can activated needs to be implemented in the future, seperate HttpClient in authservice is
    dependency injection issues
  */
  {path: 'settings', component: SettingsComponent, children: [
      {path: '', redirectTo: 'account', pathMatch: 'full'},
      {path: 'account', component: AccountComponent},
      {path: 'profile', component: EditProfileComponent}
    ]}
  // {path: 'settings', components: SettingsComponent, canActivate: [SettingsActivateGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class SettingsRoutingModule {}
