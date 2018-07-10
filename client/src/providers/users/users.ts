import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Credentials, Urls as srv } from '../../utils';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  private token: string;

  constructor(private http: HttpClient, private storage: Storage) {}

  setToken(token: string) {
    this.storage.set('token', token)
      .then(() => this.token = token, 
      (err) => console.log(err)
    );
  }

  getToken(): string {
    if (!this.token) {
      this.storage.get('token')
        .then((t) => this.token = t, 
        (err) => console.log(JSON.stringify(err))
      );
    }
    return this.token;
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
        Authorization: `Bearer ${this.getToken()}` 
      }
    })
  }

  logout() {
    this.token = '';
  }

}
