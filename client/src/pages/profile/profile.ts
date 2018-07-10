import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

import { User, MessageController, Urls as srv } from '../../utils';
import { UsersProvider } from '../../providers/users/users';
import { PictureProvider } from '../../providers/picture/picture';
import { LoginPage } from '../login/login';

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
              private userService: UsersProvider, private camera: Camera, private loadCtrl: LoadingController, 
              private actionSheetCtrl: ActionSheetController, private msg: MessageController, 
              private picService: PictureProvider) {}


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

  safeImage() {
    return this.sanitizer.bypassSecurityTrustUrl(this.user.profile_pic);
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.picService.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.picService.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  upload() {
    let loader = this.loadCtrl.create({
      content: 'Uploading...'
    });

    loader.present();

    let options = {
      mimeType: 'multipart/form-data',
      headers: {
        Authorization: `Bearer ${this.userService.getToken()}`
      }
    }

    this.picService.upload(`${srv.BASE_URL}/users/`, options)
      .then((data) => {
        console.log(JSON.stringify(data) + " Uploaded Successfully");
        loader.dismiss();
        this.msg.show('Success', JSON.stringify(data));
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        loader.dismiss();
        this.msg.show('Error', JSON.stringify(err));
      })
  }

  logout() {
    this.userService.setToken('');
    this.navCtrl.setRoot(LoginPage);
  }

}
