import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Router} from '@angular/router';
import {UserModel} from '../models/user.model';
import {TokenPayloadModel} from '../models/token-payload.model';
import {api} from '../../../environments/environment';
import {ResponseModel} from '../../core-module/models/response.model';

@Injectable()
export class AuthService {
  private token: string;
  constructor(private http: HttpClient, private router: Router) {
  }

  private saveToken(token: string) : void {
    localStorage.setItem('access-token', token);
    this.token = token;
}

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('access-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removetem('access-token');
    this.router.navigateByUrl('/');
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

  public login(user: TokenPayloadModel): Observable<Object> {
    return this.http.post(api.endpoints.auth, user).map((res: ResponseModel) => {
      return res.body.data;
    });
  }

}
