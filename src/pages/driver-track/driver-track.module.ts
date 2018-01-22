import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverTrackPage } from './driver-track';

@NgModule({
  declarations: [
    DriverTrackPage,
  ],
  imports: [
    IonicPageModule.forChild(DriverTrackPage),
  ],
  exports: [
    DriverTrackPage
  ]
})
export class DriverTrackPageModule {}
