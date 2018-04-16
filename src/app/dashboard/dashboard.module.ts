import {NgModule} from '@angular/core';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard.component';
import {DashboardHomeComponent} from './components/dashboard-home/dashboard-home.component';
import {DashboardProductComponent} from './components/dashboard-product/dashboard-product.component';
import {DashboardService} from './services/dashboard.service';
import {DashboardAddProductComponent} from './components/dashboard-add-product/dashboard-add-product.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FileDropModule} from 'ngx-file-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardBasicFormComponent} from './components/dashboard-add-product/dashboard-basic-form/dashboard-basic-form.component';
import {DashboardProjectInfoComponent} from './components/dashboard-add-product/dashboard-project-info/dashboard-project.info.component';
import {DashboardStoryComponent} from './components/dashboard-story/dashboard-story.component';
import {CKEditorModule} from 'ng2-ckeditor';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    NgbModule,
    FileDropModule,
    CKEditorModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    DashboardStoryComponent,
    DashboardProductComponent,
    DashboardBasicFormComponent,
    DashboardAddProductComponent,
    DashboardProjectInfoComponent
  ],
  providers: [
    DashboardService
  ]
})

export class DashboardModule {}
