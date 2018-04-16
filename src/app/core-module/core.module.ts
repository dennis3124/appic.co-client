import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderInterceptor} from './interceptors/header.interceptor';
import {PostService} from './services/post.service';
import {CompanyService} from './services/company.service';
import {UserService} from './services/user.service';
import {UtilsService} from './services/utils.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    PostService,
    UtilsService,
    CompanyService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ]
})

export class CoreModule {}
