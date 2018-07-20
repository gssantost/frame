import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentModule } from 'ngx-moment';
import { PostDetailPage } from './post-detail';

@NgModule({
  declarations: [
    PostDetailPage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(PostDetailPage),
  ],
})
export class PostDetailPageModule {}
