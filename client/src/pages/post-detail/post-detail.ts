import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';
import { MessageController } from '../../utils';

/**
 * Generated class for the PostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage {

  post: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private postsService: PostsProvider,
    private msg: MessageController
  ) {
    this.post = {};
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('mediaId'))
    this.suscribeDetail()
  }

  ionViewDidEnter() {
    console.log(this.navParams.get('mediaId'))
    this.suscribeDetail()
  }

  suscribeDetail() {
    return this.postsService.getPostDetail(this.navParams.get('mediaId'))
      .subscribe((data) => {
        if (data.status === 200) {
          this.post = data.data;
          console.log(this.post);
        } else {
          this.msg.show('Error', data.error);
        }
      })
  }

}
