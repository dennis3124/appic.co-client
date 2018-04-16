import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Router} from '@angular/router';
import {UserModel} from '../models/user.model';
import {UserLoginModel} from '../models/token-payload.model';
import {api, environment} from '../../../environments/environment';
import {ResponseModel} from '../../core-module/models/response.model';
import {TokenResponse} from '../models/token.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {DashboardService} from '../../dashboard/services/dashboard.service';

@Injectable()
export class AuthService {
  private token: string;
  private user: UserModel;
  private storage;
  public userUpdate$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router, private dashboardService: DashboardService) {
    this.storage = environment.useSessionStorage ? sessionStorage : localStorage;
  }

  private saveToken(token: string): void {
    this.storage.setItem('access-token', token);
    this.token = token;
}

  private getToken(): string {
    if (!this.token) {
      this.token = this.storage.getItem('access-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    this.storage.removeItem('access-token');
    this.storage.removeItem('user');
    this.router.navigateByUrl('/');
    this.userUpdate$.next(true);
    this.dashboardService.removeCompany();

  }

  public getUserDetails(): UserModel {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public createUser(user: Object): Observable<Object> {
    const request = {
      user: user
    };
    return this.http.post(api.endpoints.users, request).map( (res: ResponseModel) => {
      return res.body.data;
    });
  }

  public saveUser(user: UserModel): void {
    this.storage.setItem('userId', user._id);
  }

  public getUserId(): string {
    return this.storage.getItem('userId');
  }

  public login(user: UserLoginModel): Observable<any> {
    return this.http.post(api.endpoints.auth, user).map((res: ResponseModel) => {
      if (res.success && res.body.data) {
        if (res.body.data['token']) {
          this.saveToken(res.body.data['token']);
          this.userUpdate$.next(true);
          this.saveUser(res.body.data['user']);
        }
      }
      return res.body.data;
    });
  }

}
