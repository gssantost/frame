import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Credentials, MessageController } from '../../utils';
import { UsersProvider } from '../../providers/users/users';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  credentials: Credentials = {
    fullname: '',
    username: '',
    email: '',
    password: ''
  }

  constructor(private userService: UsersProvider, public navCtrl: NavController, public navParams: NavParams,
              public msgCtrl: MessageController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    console.log('Register!');
    this.userService.register(this.credentials).subscribe((data) => {
      if (data.status === 200) {
        this.msgCtrl.show('Success', data.message, () => this.navCtrl.popToRoot());
      } else {
        this.msgCtrl.show('Error', data.error)
      }
    })
  }

}
