import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../core-module/services/post.service';
import {PostModel} from '../../core-module/models/post.model';
import {environment} from '../../../environments/environment';
import {UtilsService} from '../../core-module/services/utils.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    // LOGIC
    // Get user's subscribed topics. Then do a post request to query for 20 items(MIN) of post with that topic

  }

}
