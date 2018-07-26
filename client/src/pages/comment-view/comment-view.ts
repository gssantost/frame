import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PostCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment-view',
  templateUrl: 'comment-view.html',
})
export class CommentViewPage {

  id: number;
  parentValue: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get('mediaId');
  }

  ionViewWillEnter() {
    this.id = this.navParams.get('mediaId');
    console.log(this.id);
  }

}
