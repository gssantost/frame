import { Injectable } from "@angular/core";
import { AlertController, LoadingController, Loading, ToastController } from "ionic-angular";

@Injectable()
export class MessageController {

  loader: Loading;

  constructor(
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  show(title, text, cb?) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: cb
        }
      ]
    });
    alert.present();
  }

  toast(text, position?, duration?, cb?) {
    let toast = this.toastCtrl.create({
      message: text,
      position: position || "bottom",
      duration: duration || 2000
    });
    toast.present();
  }

  load(loadingMessage?: string) {
    this.loader = this.loadingCtrl.create({
      content: 'Loading...' || loadingMessage
    });
    this.loader.present();
  }

  dismiss() {
    this.loader.dismiss();
  }

}