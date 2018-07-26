import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { User, Urls as srv, MessageController } from '../../utils';
import { PictureProvider } from '../../providers/picture/picture';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  user: User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private userService: UsersProvider, 
    private actionSheetCtrl: ActionSheetController, 
    private pictureService: PictureProvider, 
    private camera: Camera, 
    private msg: MessageController, 
    ) {
      this.user = { fullname: '', username: '', email: '', bio: '', profile_pic: '' };
    }

  ionViewDidEnter() {
    this.getUserProfile()
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe(data => {
      if (data.status === 200) {
        this.user = data.data;
      } else {
        this.msg.show('Error', data.error);
      }
    })
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.pictureService.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pictureService.takePicture(this.camera.PictureSourceType.CAMERA);
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

  send() {
    if (this.pictureService.getPicture() === '') {
      this.msg.load('Please wait...')
      this.userService.putUserProfile(this.user).subscribe((data) => {
        if (data.status === 200) {
          this.msg.dismiss();
          this.msg.show('Success', data.message, () => {
            this.navCtrl.pop();
          });
        } else {
          this.msg.dismiss();
          this.msg.show('Error', data.error.message || data.error);
        }
      }, (error) => console.log(JSON.stringify(error)))
    } else {
      this.upload();
    }
  }

  back() {
    this.navCtrl.pop();
  }

  upload() {
    this.msg.load('Uploading...');

    let options = {
      mimeType: 'multipart/form-data',
      headers: {
        Authorization: `Bearer ${this.userService.getToken()}`
      },
      params: {
        fullname: this.user.fullname,
        username: this.user.username,
        bio: this.user.bio,
        email: this.user.email
      }
    }

    this.pictureService.upload(`${srv.BASE_URL}/users/`, options)
      .then((data) => {
        console.log(data);
        this.msg.dismiss();
        this.msg.show('Success', 'Upload completed!');
      })
      .catch((err) => {
        this.msg.dismiss();
        this.msg.show('Error', err.message);
      })
  }

}