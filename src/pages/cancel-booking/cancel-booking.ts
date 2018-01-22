import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services'
/**
 * Generated class for the CancelBookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({ 
  selector: 'page-cancel-booking',
  templateUrl: 'cancel-booking.html',
})
export class CancelBookingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth: ServicesProvider) {
  }
  cancelbooking(bookingid){
    this.auth.CancelBooking(bookingid).then(res =>{
      console.log(res);
      res.json().data
    } )
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelBookingPage');
  }

}
