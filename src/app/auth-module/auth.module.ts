import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {AuthComponentModule} from './components/auth-component.module';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthService,
  ],
  exports: [
    AuthComponentModule
  ]
})

export class AuthModule {
  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('Auth Module is already loaded. Import it in AppModule only.');
    }
  }
}
