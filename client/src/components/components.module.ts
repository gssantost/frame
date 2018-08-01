import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'ngx-moment';
import { PostComponent } from './post/post';
import { HeadlineComponent } from './headline/headline';
import { CommentListComponent } from './comment-list/comment-list';
import { CommentComponent } from './comment/comment';
import { SearchBoxComponent } from './search-box/search-box';
@NgModule({
	declarations: [PostComponent,
    HeadlineComponent,
    CommentListComponent,
    CommentComponent,
    SearchBoxComponent],
	imports: [IonicModule, MomentModule],
  exports: [PostComponent,
    HeadlineComponent,
    CommentListComponent,
    CommentComponent,
    SearchBoxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
