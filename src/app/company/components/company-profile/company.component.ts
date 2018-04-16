import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../../core-module/services/company.service';
import {ActivatedRoute} from '@angular/router';
import {CompanyModel} from '../../../core-module/models/company.model';
import {UtilsService} from '../../../core-module/services/utils.service';

@Component({
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit {
  private company: CompanyModel;
  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private util: UtilsService
  ) {}
  ngOnInit() {
    this.util.showLoader();
    this.route.params.subscribe(params => {
      if (params.id) {
        this.companyService.getCompany(params.id).subscribe(company => {
          this.company = company[0];
          this.util.hideLoader();
        });
      }
    });
  }
}
