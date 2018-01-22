import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingDetailsPage} from '../booking-details/booking-details';
import { ServicesProvider } from '../../providers/services/services'
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
data:any;
historydata:any; 
BookingStatus:any;
mobile:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth: ServicesProvider) {
    this.History();
    this.Masters();
   
  }

  History() {
    this.data = this.auth.History().then(response => {
      this.data = response.json();
         
    
      this.historydata = this.data.Response;
   
      console.log(this.data.Response);
    })
  }

 

  Masters() {
    this.data = this.auth.Masters().then(response => {
      let data = response.json();
      this.BookingStatus = data.Response.BookingStatus
      this.data=data;
     
      console.log(data);
    })
  }
 
  BookingDetailsFunction(historydata,i){ 
   console.log(historydata,i);
    this.navCtrl.push(BookingDetailsPage, {
      data:historydata,
      id:i
     
     });
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MybookingsPage');
  }

}
