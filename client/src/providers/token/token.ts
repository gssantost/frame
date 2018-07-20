import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the TokenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TokenProvider {

  private token: string;

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello TokenProvider Provider');
  }

  setToken(token: string) {
    this.storage.set('token', token)
    .then(
      () => this.token = token,
      (e) => console.log(JSON.stringify(e))
    );
  }

  getToken(): string {
    if (!this.token) {
      this.storage.get('token')
      .then(
        (t) => this.token = t,
        (e) => console.log(JSON.stringify(e))
      );
    }
    return this.token;
  }

  clear() {
    this.storage.clear()
    .then(() => console.log('Token store cleared.'),
      (e) => console.log(e)
    )
  }

}
