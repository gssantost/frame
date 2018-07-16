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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public msgCtrl: MessageController, 
    private userService: UsersProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    this.msgCtrl.load();
    this.userService.register(this.credentials).subscribe((data) => {
      if (data.status === 200) {
        this.msgCtrl.dismiss();
        this.msgCtrl.show('Success', data.message, () => this.navCtrl.popToRoot());
      } else {
        this.msgCtrl.dismiss();
        this.msgCtrl.show('Error', data.error)
      }
    })
  }

}
