import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Credentials } from '../../helpers';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  private IP: string = '192.168.0.104';
  private BASE_URL: string = `http://${this.IP}:3000/api`;
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
    return this.http.post(`${this.BASE_URL}/signup/`, user);
  }

  login(user: Credentials): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/login`, user);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/auth/profile`, { 
      headers: {
        Authorization: `Bearer ${this.getToken()}` 
      }
    })
  }

  logout() {
    this.token = '';
  }

}
