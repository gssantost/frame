import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";

@Injectable()
export class MessageController {
  constructor(private alertCtrl: AlertController) {}

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

}