import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { User, Urls as srv, MessageController } from '../../utils';
import { UsersProvider } from '../../providers/users/users';
import { LoginPage } from '../login/login';
import { EditPage } from '../edit/edit';
import { PostsProvider } from '../../providers/posts/posts';
import { DomSanitizer } from '@angular/platform-browser';
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

  galleryType: string = 'regular';

  posts: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public sanitizer: DomSanitizer,
              private app: App,
              private userService: UsersProvider,
              private postsService: PostsProvider,
              private msg: MessageController) {}


  ionViewDidLoad() {
    this.getUserProfile()
    this.getUserPosts()
  }

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
