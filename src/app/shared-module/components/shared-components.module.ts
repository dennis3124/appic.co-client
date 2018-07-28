import {NgModule} from '@angular/core';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {AuthModule} from '../../auth-module/auth.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FooterComponent} from './footer/footer.component';
import {ProductCardComponent} from './cards/product-card/product-card.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    AuthModule,
    NgbModule,
  ],
  declarations: [
    NavBarComponent,
    FooterComponent,
    ProductCardComponent
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    ProductCardComponent
  ],
})

export class SharedComponentsModule {}
