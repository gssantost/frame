import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../utils/interfaces';

/**
 * Generated class for the CommentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'comment',
  templateUrl: 'comment.html'
})
export class CommentComponent {

  @Input() props: Comment;
  @Input() index: number;
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor() {}

  update() {
    this.onUpdate.emit({id: this.props.comment_id, index: this.index, text: this.props.comment_text});
  }

  delete() {
    this.onDelete.emit({id: this.props.comment_id, index: this.index});
  }

}
