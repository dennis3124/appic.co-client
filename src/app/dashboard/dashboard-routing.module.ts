import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard.component';
import {DashboardHomeComponent} from './components/dashboard-home/dashboard-home.component';
import {DashboardProductComponent} from './components/dashboard-product/dashboard-product.component';
import {DashboardAddProductComponent} from './components/dashboard-add-product/dashboard-add-product.component';
import {DashboardEditProductComponent} from './components/dashboard-edit-product/dashboard-edit-product.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: DashboardHomeComponent},
      {path: 'products', component: DashboardProductComponent},
      {path: 'products/add', component: DashboardAddProductComponent},
      {path: 'products/edit/:id', component: DashboardEditProductComponent}
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]

})

export class DashboardRoutingModule {}
