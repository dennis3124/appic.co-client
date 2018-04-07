import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {api} from '../../../environments/environment';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestOption = {
      url: req.url,
      setHeaders: {}
    };
    requestOption.setHeaders['Content-Type'] = 'application/json';
    requestOption.url = api.baseUrls.local + req.url;

    return next.handle(req.clone(requestOption));
  }
}
