import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { CommentProvider } from '../../providers/comment/comment';
import { Comment } from '../../utils/interfaces';
import { MessageController } from '../../utils';

/**
 * Generated class for the CommentListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comment-list',
  templateUrl: 'comment-list.html'
})
export class CommentListComponent implements OnDestroy, AfterViewInit {

  newComment: string;

  event: any = {};

  isUpdate: boolean = false;

  comments: Comment[];

  @Input() media: number;

  constructor(private commentService: CommentProvider, private msg: MessageController) {}

  ngAfterViewInit() {
    this.commentService.getComments(this.media)
      .subscribe(comments => this.comments = comments.data);
  }

  ngOnDestroy() {
    this.newComment = '';
  }

  getComments(media) {
    this.commentService.getComments(media)
      .subscribe(comments => this.comments = comments.data);
  }

  handleDelete($event) {
    const { id, index } = $event;
    this.commentService.deleteComment(id)
      .subscribe(data => {
        if (data.status === 200) {
          this.msg.toast(data.message);
          this.comments.splice(index, 1);
        } else {
          this.msg.toast('Something bad happened!');
        }
      }
    );
  }

  handleUpdate($event) {
    const { text, ...rest } = $event;
    this.newComment = text;
    this.event = { ...rest };
    this.isUpdate = true;
  }

  handleSubmit() {
    if (this.isUpdate) {
      const { id, index } = this.event;
      this.commentService.putComment(this.newComment, id)
        .subscribe(data => {
          if (data.status === 200) {
            this.msg.toast(data.message);
            const clone = { ...this.comments[index] };
            this.comments.splice(index, 1, { ...clone, ...data.data });
          }
        }
      );
      this.event = {};
      this.isUpdate = false;
      this.newComment = '';
    } else {
      if (this.newComment === '') { this.msg.toast('FIELD IS EMPTY'); }
      this.commentService.postComment(this.newComment, this.media)
        .subscribe(data => {
          if (data.status === 200) {
            this.comments.push(data.data);
          }
        }
      );
    }
  }

}
