import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { User, Urls as srv } from '../../utils';
import { UsersProvider } from '../../providers/users/users';
import { LoginPage } from '../login/login';
import { EditPage } from '../edit/edit';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cordova: any;

  user: User = { fullname: '', username: '', email: '', bio: '', profile_pic: '' }

  constructor(public navCtrl: NavController, public sanitizer: DomSanitizer, public navParams: NavParams, 
              private userService: UsersProvider) {}


  ionViewDidLoad() {
    this.getUserProfile()
  }

  public getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ionViewDidEnter() {
    this.getUserProfile()
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe(data => {
      if (data.status === 200) {
        const { profile_pic, ...rest } = data.data;
        this.user = rest;
        this.user.profile_pic = `${srv.STATIC_URL}/${profile_pic.split('\\uploads\\')[1]}`;
        console.log(this.user.profile_pic);
        console.log(this.user);
      }
    })
  }

  edit() {
    this.navCtrl.push(EditPage);
  }

  logout() {
    this.userService.setToken('');
    this.navCtrl.setRoot(LoginPage);
  }

}
