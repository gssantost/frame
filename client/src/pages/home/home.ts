import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { LoginPage } from '../login/login'
import { MessageController } from '../../utils';
import { PostsProvider } from '../../providers/posts/posts';
import { ProfilePage } from '../profile/profile';
import { CommentViewPage } from '../comment-view/comment-view';
import { SearchPage } from '../search/search';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  pageCounter: number;
  limit: number;
  posts: any;
  cache: any = [];
  more: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userService: UsersProvider,
    private postsService: PostsProvider,
    private app: App,
    private msg: MessageController
  ) {
    this.pageCounter = 1;
    this.limit = 2;
    this.more = true;
  }

  ionViewDidEnter() {
    this.postsService.getPosts(this.limit, this.pageCounter)
      .subscribe((data) => {
        if (data.status === 200) {
          this.cache = data.data;
          this.posts = this.cache;
        } else {
          this.msg.show('Error', data.error);
        }
      })
    this.pageCounter++
  }

  ionViewDidLeave() {
    this.pageCounter = 1;
    this.more = true;
  }

  search() {
    this.navCtrl.setRoot(SearchPage);
  }

  showProfile(id) {
    this.navCtrl.push(ProfilePage, { userId: id })
  }

  showComments(id) {
    this.navCtrl.push(CommentViewPage, { mediaId: id })
  }

  logout() {
    this.userService.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  doInfinite(infiniteScroll) {
    if (!(this.cache.length < this.limit)) {
      this.postsService.getPosts(this.limit, this.pageCounter)
        .subscribe((data) => {
          if (data.status === 200) {
            this.cache = data.data
            for (let i = 0; i < this.cache.length; i++) {
              this.posts.push(this.cache[i])
            }
            this.pageCounter++
          } else {
            this.msg.show('Error', data.error);
          }
          infiniteScroll.complete()
        })
    } else {
      this.msg.toast('No more posts...');
      this.more = false;
      infiniteScroll.complete();
    }
  }

}
