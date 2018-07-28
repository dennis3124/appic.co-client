import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../../core-module/services/company.service';
import {DashboardService} from '../../services/dashboard.service';
import {AuthService} from '../../../auth-module/services/auth.service';
import {CompanyModel} from '../../../core-module/models/company.model';

@Component({
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})

export class DashboardHomeComponent implements OnInit {
  private company: CompanyModel;
  constructor(private companyService: CompanyService, private auth: AuthService,
              private dashboardService: DashboardService) {

  }
  ngOnInit() {
    this.company = this.dashboardService.getCompany();
    console.log(this.company);
    if (!this.company) {
      this.companyService.getByOwnerId(this.auth.getUserId()).subscribe(data => {
        // Only allow one company
        this.company = data[0];
        this.dashboardService.setCompany(this.company);
      });
    }
  }
}

