import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../core-module/services/post.service';
import {PostModel} from '../../../core-module/models/post.model';
import {DashboardService} from '../../services/dashboard.service';
import {UtilsService} from '../../../core-module/services/utils.service';
import {NgbAccordionConfig, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './dashboard-edit-product.component.html',
  styleUrls: ['./dashboard-edit-product.component.scss']
})

export class DashboardEditProductComponent implements OnInit {
  private post: PostModel;
  private panel = 1;
  @ViewChild('acc') accordion;
  constructor(private route: ActivatedRoute, private utils: UtilsService, private config: NgbAccordionConfig,
              private dashboardService: DashboardService, private changeDetectorRef: ChangeDetectorRef,
              private postService: PostService, private router: Router) {
    config.closeOthers = true;
    config.type = 'primary';
  }

  ngOnInit() {
    this.utils.showLoader();
    this.route.params.subscribe(params => {
      if (!params.id) {
        alert('You need ID to edit this product');
      } else {
        // Check Authority of product edit
        this.postService.getPost(params.id).subscribe(post => {
          if (post[0].companyId === this.dashboardService.getCompany()._id) {
            this.post = post[0];
          } else {
            alert('You are not authorized in this page');
            this.router.navigate(['home']);
          }
        }, (err) => {
          alert('No Product Found');
          this.router.navigate(['home']);
        }, () => {
          this.utils.hideLoader();
        });
      }
    });
  }

  onFinishProjectDetails(done: boolean) {
    // if (done) {
    //   this.changeDetectorRef.detectChanges();
    //   this.panel++;
    //   this.accordion.toggle(`panel-${this.panel}`);
    // }
  }

  onFinishStory(done: boolean) {
    console.log(done);
    if (done) {
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
  }

  beforeChange(event: NgbPanelChangeEvent) {
    // Only allow toggling from done button / back button
    // if (event.panelId !== `panel-${this.panel}`) {
    //   event.preventDefault();
    // }
  }

}
