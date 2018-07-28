import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {UtilsService} from '../../../core-module/services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../core-module/services/post.service';
import {DashboardService} from '../../services/dashboard.service';
import {PostModel} from '../../../core-module/models/post.model';

@Component({
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss']
})

export class DashboardProductComponent implements OnInit {

  private posts: Array<PostModel>;

  constructor(private util: UtilsService,
              private route: ActivatedRoute,
              private dashboardService: DashboardService,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit() {
    this.util.showLoader();
    // Wait for company to be received
    this.dashboardService.companySubject$.subscribe(data => {
      if (data) {
        // Company is set get products
        this.postService.getPostByCompanyId(this.dashboardService.getCompany()._id).subscribe(posts => {
          this.posts = posts as Array<PostModel>;
          console.log(this.posts);
          this.util.hideLoader();
        });
      }
    });

  }

}
