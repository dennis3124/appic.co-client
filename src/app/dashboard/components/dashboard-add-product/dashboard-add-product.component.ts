import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {NgbAccordionConfig, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';
import {DashboardService} from '../../services/dashboard.service';
import {PostService} from '../../../core-module/services/post.service';
import {PostModel} from '../../../core-module/models/post.model';
import {UtilsService} from '../../../core-module/services/utils.service';
import {CompanyService} from '../../../core-module/services/company.service';
import {AuthService} from '../../../auth-module/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: './dashboard-add-product.component.html',
  styleUrls: ['./dashboard-add-product.component.scss']
})

export class DashboardAddProductComponent implements OnInit, AfterViewInit {
  @ViewChild('acc') accordion;
  private basicDone = false;
  private panel = 1;
  private postInCreation: PostModel;

  constructor(private config: NgbAccordionConfig, private postService: PostService,
              private router: Router, private route: ActivatedRoute,
              private utils: UtilsService, private companyService: CompanyService,
              private auth: AuthService, private changeDetectorRef: ChangeDetectorRef,
              private zone: NgZone, private dashboardService: DashboardService) {
    config.closeOthers = true;
    config.type = 'primary';
  }

  ngAfterViewInit() {
    this.utils.showLoader();
    // Check if there are any ongoing product creation
    // First, check if company is there
    if (!this.dashboardService.getCompany()) {
      this.companyService.getByOwnerId(this.auth.getUserId()).subscribe(data => {
        // Only allow one company
        this.dashboardService.setCompany(data[0]);
        this.postService.getPostInCreation(this.dashboardService.getCompany()._id).subscribe(post => {
          this.postInCreation = post[0] as PostModel;
          this.utils.hideLoader();
          if (this.postInCreation) {
            this.basicDone = true;
            this.changeDetectorRef.detectChanges();
          }
        });
      });
    } else {
      this.postService.getPostInCreation(this.dashboardService.getCompany()._id).subscribe(post => {
        this.postInCreation = post[0] as PostModel;
        this.utils.hideLoader();
        if (this.postInCreation) {
          this.basicDone = true;
          this.changeDetectorRef.detectChanges();
        }
      });
    }

  }


  ngOnInit() {
  }

  beforeChange(event: NgbPanelChangeEvent) {
    // Only allow toggling from done button / back button
    if (event.panelId !== `panel-${this.panel}`) {
      event.preventDefault();
    }
  }

  onDone(done: boolean) {
    if (done) {
      this.basicDone = true;
    }
  }

  onFinishProjectDetails(done: boolean) {
    if (done) {
      this.changeDetectorRef.detectChanges();
      this.panel++;
      this.accordion.toggle(`panel-${this.panel}`);
    }
  }

  onFinishStory(done: boolean) {
    if (done) {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }
}
