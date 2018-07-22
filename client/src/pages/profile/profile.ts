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
  guest: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private app: App,
    private userService: UsersProvider,
    private postsService: PostsProvider,
    private msg: MessageController
  ) {}

  
  ionViewDidEnter() {
    let userId = this.navParams.get('userId');
    if (userId) {
      this.getUserProfileById(userId);
      this.getPostsById(userId);
      this.guest = true;
    } else {
      this.getUserProfile();
      this.getUserPosts();
      this.guest = false;
    }
  }

  getUserProfileById(id) {
    this.userService.getUserProfileById(id).subscribe(data => {
      if (data.status === 200) {
        this.user = data.user;
        console.log(this.user)
      } else {
        this.msg.show('Error', data.message);
      }
    })
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe(data => {
      if (data.status === 200) {
        this.user = data.user;
        console.log(this.user)
      } else {
        this.msg.show('Error', data.message);
      }
    })
  }

  getUserPosts() {
    this.postsService.getUserPosts().subscribe(data => {
      if (data.status === 200) {
        this.posts = data.data;
        console.log(this.posts)
      } else {
        this.msg.show('Ups!', data.message);
      }
    })
  }

  getPostsById(id) {
    this.postsService.getPostsByUser(id).subscribe(data => {
      if (data.status === 200) {
        this.posts = data.data;
        console.log(this.posts)
      } else {
        this.msg.show('Ups!', data.message);
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
