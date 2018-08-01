import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenProvider } from '../token/token';
import { Urls as srv, Result } from '../../utils';
import { of } from 'rxjs/observable/of';
import { Observable } from '../../../node_modules/rxjs/Observable';

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider {

  constructor(private http: HttpClient, private tokenService: TokenProvider) {
    console.log('Hello SearchProvider Provider');
  }

  getMediaByTag(id: number): Observable<any> {
    return this.http.get(`${srv.BASE_URL}/search/${id}`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  searchUsers(term: string): Observable<Result[]> {
    if (!term.trim()) {
      return of([]);
    }
    
    return this.http.get<Result[]>(`${srv.BASE_URL}/search/term/${term}`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  searchTags(term: string): Observable<Result[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Result[]>(`${srv.BASE_URL}/search/tag/${term}`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

}
