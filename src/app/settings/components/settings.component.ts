import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth-module/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  private loader = false;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.loader = true;
    if (!this.authService.isLoggedIn()) {
      alert( 'Error, You need to be logged in to access this page');
      this.router.navigate(['/login']);
    }
    this.loader = false;


  }
}
