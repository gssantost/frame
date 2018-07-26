import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

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

  user: User = {
    user_id: 0,
    fullname: '',
    username: '',
    email: '',
    bio: '',
    profile_pic: '',
    stats: {
      posts: 0,
      followers: 0,
      followings: 0,
    }
  };

  posts: any;
  galleryType: string = 'regular';
  editable: boolean;

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
      //console.log(userId);
      //console.log(this.user.user_id);
      if (userId === this.user.user_id) {
        this.getAsyncBoolean(true).subscribe(value => this.editable = value);
      }
    } else {
      this.getUserProfile();
      this.getUserPosts();
      this.getAsyncBoolean(true).subscribe(value => this.editable = value);
    }
  }

  getAsyncBoolean(b: boolean) {
    return Observable.of(b);
  }

  getUserProfileById(id) {
    this.userService.getUserProfileById(id).subscribe(data => {
      if (data.status === 200) {
        this.user = data.data;
      } else {
        this.msg.show('Error', data.message);
      }
    })
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe(data => {
      if (data.status === 200) {
        this.user = data.data;
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

  doFollow(id) {
    this.userService.postFollow(id).subscribe((data) => {
      if (data.status === 200) {
        this.msg.toast(data.message);
        this.user.stats.followers++; //maraña
      } else {
        this.msg.toast(data.error);
      }
    }, (error) => {
      this.msg.toast(error.message)
    })
  }

  edit() {
    this.navCtrl.push(EditPage);
  }

  logout() {
    this.userService.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

  showDetail(id) {
    this.navCtrl.push(PostDetailPage, { mediaId: id})
  }

}
