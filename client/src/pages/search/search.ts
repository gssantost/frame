import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { TagViewPage } from '../tag-view/tag-view';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchType: string = 'byUser';

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  showResult(event) {
    console.log(event);
    if (event.hasOwnProperty('user_id')) {
      const { user_id } = event; 
      this.navCtrl.push(ProfilePage, { user_id })
    } else {
      const { tag_id } = event;
      this.navCtrl.push(TagViewPage, { tag_id });
    }
  }

}
