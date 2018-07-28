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
  projectImage: string;
  video: string;
  status: string;
  story: string;

  constructor() {
    this.name = '';
    this.description = '';
    this.postUrl = '';
    this.category = '';
    this.images = [];
    this.projectImage = '';
    this.video = '';
    this.story = '';
  }

  setCompanyId(companyId) {
    this.companyId = companyId;
  }

  setProjectImage(image) {
    this.projectImage = image;
  }

}
