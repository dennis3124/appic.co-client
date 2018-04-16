import {CanActivate} from '@angular/router';

export class SettingsActivateGuard implements CanActivate {
  constructor() {}
  canActivate() {
    return true;
  }
}
