import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { User, MessageController } from '../../utils';
import { UsersProvider } from '../../providers/users/users';
import { LoginPage } from '../login/login';
import { EditPage } from '../edit/edit';
import { PostsProvider } from '../../providers/posts/posts';
import { PostDetailPage } from '../post-detail/post-detail';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User = { fullname: '', username: '', email: '', bio: '', profile_pic: '' }
  posts: any;
  galleryType: string = 'regular';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private app: App,
    private userService: UsersProvider,
    private postsService: PostsProvider,
    private msg: MessageController
  ) {}

  
  ionViewDidEnter() {
    this.getUserProfile()
    this.getUserPosts()
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe(data => {
      if (data.status === 200) {
        this.user = data.user;
        console.log(this.user)
      } else {
        this.msg.show('Error', data.error);
      }
    })
  }

  getUserPosts() {
    this.postsService.getUserPosts().subscribe(data => {
      if (data.status === 200) {
        this.posts = data.data;
        console.log(this.posts)
      } else {
        this.msg.show('Ups!', data.error);
      }
    })
  }

  edit() {
    this.navCtrl.push(EditPage);
  }

  logout() {
    this.userService.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  toDate(value) {
    return new Date(value).toLocaleDateString();
  }

  showDetail(id) {
    this.navCtrl.push(PostDetailPage, { mediaId: id})
  }

}
