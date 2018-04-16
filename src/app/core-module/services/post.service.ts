import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostModel} from '../models/post.model';
import {Observable} from 'rxjs/Observable';
import {api} from '../../../environments/environment';
import {ResponseModel} from '../models/response.model';

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<any> {
    return this.http.get(api.endpoints.posts).map((res: ResponseModel) => {
      return res.body.data;
    });
  }

  getPost(id): Observable<PostModel> {
    return this.http.get(api.endpoints.posts + `/${id}`).map((res: ResponseModel) => {
      return <PostModel> res.body.data;
    });
  }

  getPostByCompanyId(id): Observable<PostModel> {
    return this.http.get(api.endpoints.posts + `/company/${id}`).map((res: ResponseModel) => {
      return <PostModel> res.body.data;
    });
  }

  createPost(postObj: PostModel): Observable<any> {
    return this.http.post(api.endpoints.posts, postObj).map((res: ResponseModel) => {
      return res;
    });
  }

  uploadImage(image) {
    return this.http.post(api.endpoints.posts + '/image/upload', image).map((res: ResponseModel) => {
      return res;
    });
  }

  removeImage(imageName) {
    const requestObj = {
      fileName: imageName
    };

    return this.http.post(api.endpoints.posts + '/image/remove', requestObj).map((res: ResponseModel) => {
      return res;
    });
  }

}
