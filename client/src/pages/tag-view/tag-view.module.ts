import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TagViewPage } from './tag-view';

@NgModule({
  declarations: [
    TagViewPage,
  ],
  imports: [
    IonicPageModule.forChild(TagViewPage),
  ],
})
export class TagViewPageModule {}
