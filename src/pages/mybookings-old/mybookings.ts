import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingDetailsPage} from '../booking-details/booking-details';
/**
 * Generated class for the MybookingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mybookings',
  templateUrl: 'mybookings.html',
})
export class MybookingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  BookingDetailsFunction(){
    this.navCtrl.push(BookingDetailsPage);
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MybookingsPage');
  }

}
