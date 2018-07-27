import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Urls as srv } from '../../utils';
import { TokenProvider } from '../token/token';
import { Observable } from '../../../node_modules/rxjs/Observable';

/*
  Generated class for the LikesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LikesProvider {

  constructor(private http: HttpClient, private tokenService: TokenProvider) {
    console.log('Hello LikesProvider Provider');
  }

  postLike(mediaId): Observable<any> {
    return this.http.post(`${srv.BASE_URL}/likes/`, { mediaId }, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    });
  }

}
