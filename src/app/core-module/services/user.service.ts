import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {api} from '../../../environments/environment';
import {ResponseModel} from '../models/response.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<any> {
    return this.http.get(api.endpoints.users + `/${id}`).map((res: ResponseModel) => {
      return res.body.data;
    });
  }
}
