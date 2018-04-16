import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {api, environment, authorizedEndpoints} from '../../../environments/environment';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  private storage;
  constructor() {
    this.storage = environment.useSessionStorage ? sessionStorage : localStorage;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestOption = {
      url: req.url,
      setHeaders: {}
    };
    if (!environment.upload) {
      // Only sdd content type if its not file upload
      requestOption.setHeaders['Content-Type'] = 'application/json';
    }

    if (this.checkIfAuthorizationRequired(req)) {
      const token = this.storage.getItem('access-token');
      if (token) {
        requestOption.setHeaders['Authorization'] = `Bearer ${token}`;
      } else {
        return Observable.throw('Not Authroized');
      }
    }

    if (environment.auth) {
      requestOption.url = api.baseUrls.localAuth + req.url;
    } else {
      requestOption.url = api.baseUrls.localCore + req.url;
    }

    if (environment.limit > 0 || environment.skip > 0) {
      requestOption.url += `?limit=${environment.limit}&skip=${environment.skip}`;
    }
    return next.handle(req.clone(requestOption));
  }

  checkIfAuthorizationRequired(req) {
    // Posting to authorized endpoints
    if (authorizedEndpoints.indexOf(req.url) > 0 && req.method === 'POST') {
      // Add token to header
      return true;
    }
    return false;
  }
}


