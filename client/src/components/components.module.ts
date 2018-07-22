import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PostComponent } from './post/post';
import { IonicModule } from 'ionic-angular';
import { MomentModule } from 'ngx-moment';
@NgModule({
	declarations: [PostComponent],
	imports: [IonicModule, MomentModule],
  exports: [PostComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
