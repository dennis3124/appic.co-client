import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CompanyService} from '../../core-module/services/company.service';
import {CompanyModel} from '../../core-module/models/company.model';
import {AuthService} from '../../auth-module/services/auth.service';
import {DashboardService} from '../services/dashboard.service';
import {PostService} from '../../core-module/services/post.service';
import {environment} from '../../../environments/environment';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  private toggle = false;
  private company: CompanyModel;
  private file;
  constructor(private router: Router, private dashboardService: DashboardService,
              private postService: PostService,
              private auth: AuthService, private companyService: CompanyService) {
  }

  ngOnInit() {

    this.company = this.dashboardService.getCompany();
    if (!this.company) {
      this.companyService.getByOwnerId(this.auth.getUserId()).subscribe(data => {
        // Only allow one company
        this.company = data[0];
        this.dashboardService.setCompany(this.company);
      });
    }
  }

  toggleSidebar() {
    this.toggle = !this.toggle;
  }

  onChange(file) {
    this.file = file[0];
  }

  submitFile() {
    const formData = new FormData();
    formData.append('image', this.file);
    formData.append('companyUrl', this.company._id);
    environment.upload = true;
    this.postService.uploadImage(formData).subscribe(data => {
      console.log(data);
    });
  }
}
