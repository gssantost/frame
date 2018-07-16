import { Injectable } from "@angular/core";
import { AlertController, LoadingController, Loading } from "ionic-angular";

@Injectable()
export class MessageController {

  loader: Loading;

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

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