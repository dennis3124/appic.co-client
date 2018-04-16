import {Injectable} from '@angular/core';
import {CompanyModel} from '../../core-module/models/company.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {PostModel} from '../../core-module/models/post.model';

@Injectable()
export class DashboardService {
  private company: CompanyModel;
  private file: File;
  public companySubject$ = new BehaviorSubject<boolean>(false);
  public product = new PostModel();
  constructor() {}

  setCompany(company): void {
    this.company = company;
    this.companySubject$.next(true);
    this.product.setCompanyId(this.company._id);
  }

  getCompany(): CompanyModel {
    return this.company;
  }

  removeCompany(): void {
    this.company = null;
    this.companySubject$.next(false);
  }

  setFile(file): void {
    this.file = file;
  }

  getFile(): File {
    return this.file;
  }

  removeFile(): void {
    this.file = null;
  }

  getProduct(): PostModel {
    return this.product;
  }

  setProductImage(image): void {
    this.product.setImage(image);
  }
}
