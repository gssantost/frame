import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
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
export class HeadlineComponent implements AfterViewInit {

  @Input() props: User;
  @Input() followable: boolean;
  @Output() navigate: EventEmitter<any> = new EventEmitter();
  @Output() follow: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngAfterViewInit() {}

  handleEdit() {
    this.navigate.emit(null);
  }

  handleFollow() {
    this.follow.emit({ id: this.props.user_id, followable: this.followable });
  }

  /*
  handleFollow(id: number) {
    this.follow.emit(id);
  }
  */

}
