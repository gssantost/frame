import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Urls as srv } from '../../utils/index'
import { Observable } from '../../../node_modules/rxjs/Observable';
import { TokenProvider } from '../token/token';

/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostsProvider {

  defaults: any; 

  constructor(public http: HttpClient, private tokenService: TokenProvider) {
    this.defaults = {
      Authorization: `Bearer ${this.tokenService.getToken()}`
    }
  }

  public getUserPosts(): Observable<any> {
    return this.http.get(`${srv.BASE_URL}/posts/`, { headers: { ...this.defaults } })
  }

  public getPostDetail(id): Observable<any> {
    return this.http.get(`${srv.BASE_URL}/posts/${id}`, { headers: { ...this.defaults } })
  }

  public getPosts(limit, page): Observable<any> {
    return this.http.get(`${srv.BASE_URL}/posts/${limit}/${page}`, { headers: { ...this.defaults } })
  }

}
