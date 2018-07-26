import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentViewPage } from './comment-view';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CommentViewPage,  
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CommentViewPage),
  ],
})
export class CommentViewPageModule {}
