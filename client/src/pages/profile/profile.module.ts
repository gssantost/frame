import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentModule } from 'ngx-moment';
import { ProfilePage } from './profile';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(ProfilePage),
  ],
})
export class ProfilePageModule {}
