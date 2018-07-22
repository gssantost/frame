import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostDetailPage } from './post-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PostDetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(PostDetailPage),
  ],
})
export class PostDetailPageModule {}
