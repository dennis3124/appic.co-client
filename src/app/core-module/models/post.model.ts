export class PostModel {
  name: string;
  images: Array<string>;
  description: string;
  clicks: Array<string>;
  favorites: Array<string>;
  postUrl: string;
  category: string;
  _id: string;
  companyId: string;

  constructor() {
    this.name = '';
    this.description = '';
    this.postUrl = '';
    this.category = '';
    this.images = [];
  }

  setCompanyId(companyId) {
    this.companyId = companyId;
  }

  setImage(image) {
    this.images.push(image);
  }
}
