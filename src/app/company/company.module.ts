import {NgModule} from '@angular/core';
import {CompanyComponent} from './components/company-profile/company.component';
import {CompanyRoutingModule} from './company-routing.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CompanyCreationComponent} from './components/company-creation/company-creation.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    CompanyComponent,
    CompanyCreationComponent
  ],
  exports: [
  ]
})

export class CompanyModule {}
