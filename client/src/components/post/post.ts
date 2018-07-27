import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../utils/interfaces';
import { LikesProvider } from '../../providers/likes/likes';
import { MessageController } from '../../utils';

/**
 * Generated class for the PostComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent {

  @Input() username: string;
  @Input() profile: string;
  @Input() props: Post;
  @Output() onProfile: EventEmitter<any> = new EventEmitter();
  @Output() onComment: EventEmitter<any> = new EventEmitter();

  constructor(private LikeService: LikesProvider, private msg: MessageController) {}

  handleUsernameClick(id: number) {
    this.onProfile.emit(id);
  }

  handleCommentLink(id: number) {
    this.onComment.emit(id);
  }

  onLike(id) {
    this.LikeService.postLike(id)
      .subscribe(data => {
        if (data.status === 200) {
          let counter = parseInt(this.props.likes);
          this.props.has_like = !this.props.has_like;
          this.props.has_like ? counter++ : counter--;
          this.props.likes = counter.toString();
          //this.msg.toast(data.message);
        } else {
          this.msg.toast(data.error);
        }
      }
    );
  }

}
