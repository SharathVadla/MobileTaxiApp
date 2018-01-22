import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverConfirmationPage } from './driver-confirmation';

@NgModule({
  declarations: [
    DriverConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(DriverConfirmationPage),
  ],
  exports: [
    DriverConfirmationPage
  ]
})
export class DriverConfirmationPageModule {}
