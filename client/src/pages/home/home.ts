import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { LoginPage } from '../../pages/login/login'
import { MessageController } from '../../utils';
import { PostsProvider } from '../../providers/posts/posts';

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
  }

  ionViewDidLoad() {
    this.postsService.getPosts(this.limit, this.pageCounter)
      .subscribe((data) => {
        if (data.status === 200) {
          this.posts = data.data;
        } else {
          this.msg.show('Error', data.error);
        }
      })
    this.pageCounter++;
  }

  search() {
    this.msg.show('Ups!', 'Page in development...')
  }

  logout() {
    this.userService.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  doInfinite(infiniteScroll) {
    this.postsService.getPosts(this.limit, this.pageCounter)
      .subscribe((data) => {
        if (data.status === 200) {
          if (data.data.length === 0) {
            this.msg.show('Ups!', 'No more posts...');
            return;
          } else {
            let newPosts = data.data
            for (let i = 0; i < newPosts.length; i++) {
              this.posts.push(newPosts[i])
            }
            this.pageCounter++
          }
        } else {
          this.msg.show('Error', data.error);
        }

        infiniteScroll.complete()
      })
  }

}
