import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, NavParams, Platform } from 'ionic-angular';
import { PictureProvider } from '../../providers/picture/picture';
import { Camera } from '@ionic-native/camera';
import { MessageController } from '../../utils';
import { TokenProvider } from '../../providers/token/token';
import { Urls as srv } from '../../utils';
import { HomePage } from '../home/home';
/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  selected: boolean = false;
  description: string;

  constructor(
    public platform: Platform,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController, 
    private camera: Camera,
    private pictureService: PictureProvider,
    private tokenService: TokenProvider,
    private msg: MessageController,
  ) {

  }

  takePicture() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.pictureService.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            this.selected = true;
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pictureService.takePicture(this.camera.PictureSourceType.CAMERA);
            this.selected = true;
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
    if ((this.pictureService.getPicture() && this.description) !== '') {
      this.upload();
    } else {
      this.msg.toast('Error', 'No post!')
    }
  }

  upload() {
    this.msg.load('Uploading...');

    let options = {
      mimeType: 'multipart/form-data',
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      },
      params: {
        description: this.description
      }
    }

    this.pictureService.upload(`${srv.BASE_URL}/posts/`, options)
      .then((data) => {
        this.msg.dismiss();
        this.description = '';
        this.selected = false;
        this.msg.toast('Success');
        this.navCtrl.setRoot(HomePage);
        //this.navCtrl.setRoot
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        this.msg.dismiss();
        this.selected = false;
        this.msg.show('Error', err.message);
      })
  }

  pathForImage() {
    return this.pictureService.pathForImage(this.pictureService.getPicture());
  }
  
}
