import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Urls as srv } from '../../utils';
import { TokenProvider } from '../token/token';

/*
  Generated class for the CommentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentProvider {

  constructor(public http: HttpClient, private tokenService: TokenProvider) {
    console.log('Hello CommentProvider Provider');
  }

  getComments(mediaId): Observable<any> {
    return this.http.get(`${srv.BASE_URL}/comment/${mediaId}`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  postComment(text, mediaId): Observable<any> {
    return this.http.post(`${srv.BASE_URL}/comment/`, {
      text,
      mediaId
    }, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    });
  }

  putComment(text, commentId): Observable<any> {
    return this.http.put(`${srv.BASE_URL}/comment/`, {
      text,
      commentId
    }, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    });
  }

  deleteComment(commentId): Observable<any> {
    return this.http.delete(`${srv.BASE_URL}/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    });
  }
  
}
