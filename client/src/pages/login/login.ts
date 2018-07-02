import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Credentials, MessageController } from '../../helpers';


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

  constructor(private auth: AuthenticationProvider, public navCtrl: NavController, public navParams: NavParams,
              public msg: MessageController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  login() {
    this.auth.login(this.credentials).subscribe((data) => {
      if (data.status === 200) {
        this.auth.setToken(data.token);
        this.msg.show('Success', data.message, () => {
        this.navCtrl.setRoot('TabsPage');
        });
      } else {
        console.log(JSON.stringify(data));
        this.msg.show('Error', data.error.message || data.error);
      }
    })
  }

}
