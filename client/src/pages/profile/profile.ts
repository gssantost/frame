import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { User, MessageController } from '../../utils';
import { UsersProvider } from '../../providers/users/users';
import { LoginPage } from '../login/login';
import { EditPage } from '../edit/edit';
import { PostsProvider } from '../../providers/posts/posts';
import { PostDetailPage } from '../post-detail/post-detail';
import { CommentViewPage } from '../comment-view/comment-view';

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
    },
    has_follow: false,
    can_edit: false,
  };

  y: boolean; 
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
    let userId = this.navParams.get('userId');
    if (userId) {
      this.getUserProfileById(userId);
      this.getPostsById(userId);
      this.getFollow(userId);
    } else {
      this.getUserProfile();
      this.getUserPosts();
    }
  }

  getUserProfileById(id) {
    this.userService.getUserProfileById(id).subscribe(data => {
      if (data.status === 200) {
        this.user = data.data;
        this.user.can_edit = false;
      } else {
        this.msg.show('Error', data.message);
      }
    })
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe(data => {
      if (data.status === 200) {
        this.user = data.data;
        this.user.can_edit = true;
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

  doFollow(event) {
    const { id, followable } = event;
    if (!followable) {
      this.userService.postFollow(id).subscribe((data) => {
        if (data.status === 200) {
          this.msg.toast(data.message);
          this.user.stats.followers++;
          this.y = true;
        } else {
          this.msg.toast(data.error);
        }
      }, (error) => {
        this.msg.toast(error.message)
      })
    } else {
      this.userService.deleteFollow(id).subscribe((data) => {
        if (data.status === 200) {
          this.msg.toast(data.message);
          this.user.stats.followers--;
          this.y = false;
        } else {
          this.msg.toast(data.error);
        }
      }, (error) => this.msg.toast(error.message))
    }
  }

  getFollow(id) {
    this.userService.getFollow(id).subscribe((data) => {
      if (data.status === 200) {
        this.y = data.data.has_follow;
      } else {
        this.msg.toast('Error');
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

  showDetail(id) {
    this.navCtrl.push(PostDetailPage, { mediaId: id })
  }

  showComment(id) {
    this.navCtrl.push(CommentViewPage, { mediaId: id })
  }

}
