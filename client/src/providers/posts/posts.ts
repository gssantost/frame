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

  constructor(public http: HttpClient, private tokenService: TokenProvider) {}

  public getUserPosts(): Observable<any> {
    return this.http.get(`${srv.BASE_URL}/posts/`, { 
      headers: { 
        Authorization: `Bearer ${this.tokenService.getToken()}`
      } 
    })
  }

  public getPostDetail(id): Observable<any> {
    return this.http.get(`${srv.BASE_URL}/posts/${id}`, {
      headers: { 
        Authorization: `Bearer ${this.tokenService.getToken()}`
      } 
    })
  }

  public getPostsByUser(id): Observable<any> {
    return this.http.get(`${srv.BASE_URL}/posts/${id}/all`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  public getPosts(limit, page): Observable<any> {
    return this.http.get(`${srv.BASE_URL}/posts/${limit}/${page}`, { 
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}` 
      } 
    })
  }

  public doPost(): Observable<any> {
    return this.http.post(`${srv.BASE_URL}/posts/`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

}
