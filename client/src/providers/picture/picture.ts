import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject, FileUploadResult } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Platform, ToastController } from 'ionic-angular';

/*
  Generated class for the PictureProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PictureProvider {

  picture: string = '';

  constructor (
    public http: HttpClient, 
    private file: File, 
    private transfer: FileTransfer, 
    private filePath: FilePath,
    private camera: Camera, 
    private platform: Platform, 
    private toastCtrl: ToastController) {}
  
  takePicture(sourceType, errorHandler?) {
    const options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      targetWidth: 400,
      targetHeight: 400,
      correctOrientation: true,
      allowEdit: true,
    }

    this.camera.getPicture(options)
      .then((imagePath) => {
        let correctPath = '', currentName = '';

        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
            .then(filePath => {
              correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              this.saveToDir(correctPath, currentName);
            })
        } else {
          currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.saveToDir(correctPath, currentName);
        }
      }, (err) => {
        errorHandler(err)
      }
    )
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return this.file.dataDirectory + img;
    }
  }

  /** OK, it works with a promise too */
  upload(url, options): Promise<FileUploadResult> {
    return new Promise((res, rej) => {
      let filename = this.getPicture();
      let targetPath = this.pathForImage(filename);
      
      const fileTransfer: FileTransferObject = this.transfer.create();

      const configs: FileUploadOptions = {
        fileKey: 'file',
        fileName: filename,
        chunkedMode: false,
        ...options
      };

      fileTransfer.upload(targetPath, url, configs).then(
        (data) => {
          this.setPicture('');
          res(data)
        }, 
        (error) => {
          this.setPicture('');
          rej(error)
        }
      );
    });
  }

  getPicture(): string {
    return this.picture;
  }

  setPicture(pic: string) {
    this.picture = pic;
  }

  private saveToDir(namePath, currentName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, '')
      .then((success) => this.picture = currentName, (error) => this.presentToast('Error while storing file'))
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  /** funciona */
  /*upload(url, options, onSuccess?, onError?) {
    let targetPath = this.pathForImage(this.getPicture());
    let filename = this.getPicture();

    const fileTransfer: FileTransferObject = this.transfer.create();

    const configs: FileUploadOptions = {
      fileKey: 'file',
      fileName: filename,
      chunkedMode: false,
      ...options
    };

    fileTransfer.upload(targetPath, url, configs).then(
      (data) => onSuccess(data), 
      (error) => onError(error)
    );
  }*/

}
