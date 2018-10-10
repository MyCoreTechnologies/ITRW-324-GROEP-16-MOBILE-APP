import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MybookPage } from './mybook';

@NgModule({
  declarations: [
    MybookPage,
  ],
  imports: [
    IonicPageModule.forChild(MybookPage),
  ],
})
export class MybookPageModule {}
