import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { Credentials, MessageController } from '../../utils';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials: Credentials = {
    username: '',
    password: ''
  }

  constructor(private userService: UsersProvider, 
              public navCtrl: NavController, 
              public navParams: NavParams,
              public msg: MessageController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  login() {
    this.userService.login(this.credentials).subscribe((data) => {
      if (data.status === 200) {
        this.userService.setToken(data.token);
        this.msg.show('Success', data.message, () => {
        this.navCtrl.setRoot('TabsPage');
        });
      } else {
        console.log(JSON.stringify(data.error));
        this.msg.show('Error', data.error.message || data.error);
      }
    }, (error) => console.log(JSON.stringify(error)))
  }

}
