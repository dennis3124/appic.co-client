import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyComponent} from './components/company-profile/company.component';
import {CompanyCreationComponent} from './components/company-creation/company-creation.component';

const routes: Routes = [
  { path: 'company/create', component: CompanyCreationComponent },
  {
    path: 'company/:id', component: CompanyComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})

export class CompanyRoutingModule {}
