import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchProvider } from '../../providers/search/search';
import { MessageController } from '../../utils';
import { PostDetailPage } from '../post-detail/post-detail';

/**
 * Generated class for the TagViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tag-view',
  templateUrl: 'tag-view.html',
})
export class TagViewPage {

  posts: any;
  hasResult: boolean;
  tagTitle: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private searchService: SearchProvider,
    private msg: MessageController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TagViewPage');
  }

  ionViewDidEnter() {
    this.searchService.getMediaByTag(this.navParams.get('tagId'))
      .subscribe((data) => {
        if (data.status === 200) {
          console.log(this.posts);
          if (data.data.length <= 0) {
            this.hasResult = false;
          }
          this.hasResult = true;
          this.tagTitle = this.navParams.get('tagDes');
          this.posts = data.data;
        } else {
          this.msg.toast('Error');
        }
      })
  }

  showDetail(id) {
    this.navCtrl.push(PostDetailPage, { mediaId: id });
  }

}
