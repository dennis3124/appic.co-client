import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../core-module/services/post.service';
import {PostModel} from '../../core-module/models/post.model';
import {CompanyService} from '../../core-module/services/company.service';
import {CompanyModel} from '../../core-module/models/company.model';
import {UtilsService} from '../../core-module/services/utils.service';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  private post: PostModel;
  private loader = false;
  private company: CompanyModel;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private util: UtilsService,
              private companyService: CompanyService,
              private postService: PostService,) {
  }

  ngOnInit() {
    this.util.showLoader();
    this.route.params.subscribe((param) => {
      if (param.id) {
        // Param contains id, get Product with id
        this.postService.getPost(param.id).subscribe(post => {
          this.post = post[0];
          this.companyService.getCompany(this.post.companyId
          ).subscribe(company => {
            this.company = company[0];
            this.util.hideLoader();
          });
        });
      }
    });
  }
}
