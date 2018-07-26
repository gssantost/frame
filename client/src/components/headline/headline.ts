import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../utils';

/**
 * Generated class for the HeadlineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'headline',
  templateUrl: 'headline.html'
})
export class HeadlineComponent {

  @Input() props: User;
  @Input() editable: Observable<boolean>;
  @Output() navigate: EventEmitter<any> = new EventEmitter();
  @Output() follow: EventEmitter<any> = new EventEmitter();

  constructor() {}

  handleEdit() {
    this.navigate.emit(null);
  }

  handleFollow(id: number) {
    this.follow.emit(id);
  }

}
