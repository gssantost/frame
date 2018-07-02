import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../helpers';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

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

  user: User = { fullname: '', username: '', email: '', bio: '', profile_pic: '' }

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthenticationProvider) {
    
  }

  ionViewDidLoad() {
    this.getUserProfile()
  }

  ionViewDidEnter() {
    /*this.auth.getUserProfile().subscribe(user => {
      this.user = user;
    })*/
  }

  getUserProfile() {
    this.auth.getUserProfile().subscribe(data => {
      if (data.status === 200) {
        this.user = data.data;
        console.log(this.user);
      }
    })
  }

}
