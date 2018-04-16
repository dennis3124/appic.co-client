import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../core-module/services/user.service';
import {UserModel} from '../../models/user.model';
import {environment} from '../../../../environments/environment';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  private user: UserModel;
  private loader = false;
  constructor(private route: ActivatedRoute, private userService: UserService ) {}

  ngOnInit() {
    this.loader = true;
    this.route.params.subscribe(params => {
      if (params.id) {
        environment.auth = true;
        this.userService.getUserById(params.id).subscribe(user => {
          console.log(user);
          this.user = user[0];
          this.loader = false;
          environment.auth = false;
        });
      }
    });
  }
}
