import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {api} from '../../../environments/environment';
import {ResponseModel} from '../models/response.model';
import {CompanyModel} from '../models/company.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) {}

  getCompany(id): Observable<CompanyModel> {
    return this.http.get(api.endpoints.companies + `/${id}`).map((res: ResponseModel) =>  {
      return <CompanyModel> res.body.data;
    });
  }

  createCompany(companyObject): Observable<any> {
    return this.http.post(api.endpoints.companies, companyObject).map((res: ResponseModel) => {
      return res;
    });
  }

  getByOwnerId(id): Observable<any> {
    return this.http.get(api.endpoints.companies + `/owner/${id}`).map((res: ResponseModel) => {
      return res.body.data;
    })
  }

}
