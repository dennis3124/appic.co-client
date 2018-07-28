import {Injectable} from '@angular/core';
import {CompanyModel} from '../../core-module/models/company.model';
import {BehaviorSubject} from 'rxjs';
import {PostModel} from '../../core-module/models/post.model';
import {environment} from '../../../environments/environment';

@Injectable()
export class DashboardService {
  private storage;
  private company: CompanyModel;
  private file: File;
  public companySubject$ = new BehaviorSubject<boolean>(false);
  public product = new PostModel();
  constructor() {
    this.storage = environment.useSessionStorage ? sessionStorage : localStorage;
  }

  setCompany(company): void {
    this.company = company;
    this.product.companyId = this.company._id;
    this.storage.setItem('company', JSON.stringify(this.company));
    this.companySubject$.next(true);
  }

  getCompany(): CompanyModel {
    return JSON.parse(this.storage.getItem('company'));
  }

  removeCompany(): void {
    this.company = null;
    this.companySubject$.next(false);
  }


  removeFile(): void {
    this.file = null;
  }

  getProduct(): PostModel {
    return this.product;
  }

  setProductImage(image): void {
    this.product.projectImage = image;
  }

  setProductVideo(videoUrl): void {
    this.product.video = videoUrl;
  }

  setProduct(product) {
    this.product = product;
  }
}
