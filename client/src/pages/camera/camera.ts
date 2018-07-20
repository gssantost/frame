import { Component } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PictureProvider } from '../../providers/picture/picture';
import { Camera } from '../../../node_modules/@ionic-native/camera';
import { MessageController } from '../../utils';
import { TokenProvider } from '../../providers/token/token';
import { Urls as srv } from '../../utils';
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
        console.log(JSON.stringify(data) + " Uploaded Successfully");
        this.msg.dismiss();
        this.msg.show('Success', JSON.stringify(data.response));
        this.description = '';
        this.navCtrl.pop();
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        this.msg.dismiss();
        this.msg.show('Error', JSON.stringify(err));
      })
  }

  pathForImage() {
    return this.pictureService.pathForImage(this.pictureService.getPicture());
  }
  
}
