import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Credentials, Urls as srv, User } from '../../utils';
import { TokenProvider } from '../token/token';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  constructor(private http: HttpClient, private tokenService: TokenProvider) {}

  getToken(): string {
    return this.tokenService.getToken();
  }
  
  setToken(token: string) {
    return this.tokenService.setToken(token);
  }

  register(user: Credentials): Observable<any> {
    return this.http.post(`${srv.BASE_URL}/users/signup`, user);
  }

  login(user: Credentials): Observable<any> {
    return this.http.post(`${srv.BASE_URL}/users/login`, user);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${srv.BASE_URL}/users/`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  getUserProfileById(id): Observable<any> {
    return this.http.get(`${srv.BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  putUserProfile(user: User): Observable<any> {
    return this.http.put(`${srv.BASE_URL}/users/`, user, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  postFollow(followId): Observable<any> {
    return this.http.post(`${srv.BASE_URL}/users/follow`, { followId }, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  getFollow(userId): Observable<any> {
    return this.http.get(`${srv.BASE_URL}/users/follow/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  deleteFollow(followId): Observable<any> {
    return this.http.delete(`${srv.BASE_URL}/users/${followId}`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    })
  }

  logout() {
    this.tokenService.setToken('');
    this.tokenService.clear();
  }

}
