import {Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from '../../../auth-module/services/auth.service';
import {UserModel} from '../../../auth-module/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../../core-module/services/company.service';
import {CompanyModel} from '../../../core-module/models/company.model';
import {DashboardService} from '../../../dashboard/services/dashboard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  private loggedIn = false;
  private user: UserModel;
  private company: CompanyModel;

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private dashboardService: DashboardService,
              private companyService: CompanyService,
              private zone: NgZone,
              private router: Router) {
  }

  ngOnInit() {
    // Subscribe to user Updates;
    this._listenUserUpdates();
    this.loggedIn = this.auth.isLoggedIn();
    if (this.loggedIn) {
      this.user = this.auth.getUserDetails();
      // User has logged in, check if user has any companies;
      this.zone.run(() => {
        this.companyService.getByOwnerId(this.auth.getUserId()).subscribe(data => {
          this.company = data[0];
          this.dashboardService.setCompany(this.company);
        });
      });
    }
  }

  logout() {
    this.auth.logout();
  }

  routeSignIn() {
    this.router.navigate(['/login']);
  }

  _listenUserUpdates() {
    // Notified that user status is updated
    this.auth.userUpdate$.subscribe(data => {
      this.loggedIn = this.auth.isLoggedIn();
      if (this.loggedIn) {
        this.user = this.auth.getUserDetails();
      }
    });
  }

}
