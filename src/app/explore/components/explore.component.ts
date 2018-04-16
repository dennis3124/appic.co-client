import {Component, NgZone} from '@angular/core';
import {UtilsService} from '../../core-module/services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {PostModel} from '../../core-module/models/post.model';
import {PostService} from '../../core-module/services/post.service';

@Component({
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})

export class ExploreComponent {
  private page = 1;
  private infiniteLoader = false;
  private init = false;
  private pageSize = 20;
  private scroll = false;
  private posts: Array<PostModel>;
  private imgSrc = [
    '../../../assets/images/img1.jpg',
    '../../../assets/images/img2.jpg',
    '../../../assets/images/img3.jpg',
    '../../../assets/images/img4.jpg',
    '../../../assets/images/img5.jpg',
  ];
  constructor(private router: Router,
              private zone: NgZone,
              private util: UtilsService,
              private route: ActivatedRoute,
              private postService: PostService) {
  }

  ngOnInit() {
    this.util.showLoader();
    if (!this.init) {
      // Handle route params for pagination for the first time
      this.route.queryParams.subscribe(params => {
        if (params.page) {
          this.page = params.page;
        }

        // Only call get post on first load
        if (!this.init) {
          environment.limit = this.pageSize;
          environment.skip = (this.page - 1) * this.pageSize;
          this.postService.getPosts().subscribe(data => {
            this.posts = data;
            this.init = true;
            this.util.hideLoader();
          });
        }
      });
    }
  }

  infiniteScrollFired() {
    this.infiniteLoader = true;
    this.increasePage();
    this.postService.getPosts().subscribe(data => {
      this.posts = this.posts.concat(data);
      this.infiniteLoader = false;
    }, () => {}, () => {
      this.appendParam();
    });
  }

  increasePage() {
    environment.skip = this.page * this.pageSize;
    environment.limit = this.pageSize;
    this.page++;
  }

  appendParam() {
    // changes the route without moving from the current view or
    // triggering a navigation event
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.page
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false,
      // do not trigger navigation
    });
  }

  activateInfiniteScroll() {
    this.scroll = true;
    this.infiniteScrollFired();
  }
}
