import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services'
import { DatePipe } from '@angular/common';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { SignalR, SignalRConnection } from 'ng2-signalr';
import{DriverTrackPage}from'../driver-track/driver-track'; 
import{DriverConfirmationPage}from'../driver-confirmation/driver-confirmation'; 
import { Storage } from '@ionic/storage';
declare var $:any
declare var window:any;
/**
 * Generated class for the ConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
  Ttype;
  from;
  to;
  date;
  image;
  imagee;
  data;
  test;
  mydata;
  masterdata;
  connectionid;
  MVTID;
  masterBTID;
flat;
flng;
tlng;
tlat;
connection;
Bookdata;
count;
driverdata
onConfirmBooking;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: ServicesProvider, public alertCtrl: AlertController,private datePipe: DatePipe,public loadingCtrl: LoadingController, private signalr:SignalR,public storage: Storage) {
    this.Ttype = navParams.get('type');
    this.from = navParams.get('from');
    this.to = navParams.get('to');
    this.date = navParams.get('date');
    this.flat= navParams.get('flat');
    this.flng= navParams.get('flng');
    this.tlng= navParams.get('tlng');
    this.tlat= navParams.get('tlat');
    this.image = 6;
    this.connectionid = navParams.get('id');
    this.Masters();

    // this.connection = this.auth.getConnection();
    
    this.connection.listenFor('onConfirmBooking').subscribe((res) => {
      console.log("onConfirmBooking");
      console.log(res);
    // this.onConfirmBooking=res;
    });
  

    this.connection.listenFor('onBookedVehiclePositionChange').subscribe((res) => {
      console.log("OnBookedVehiclePositionChange");
      console.log(res);
     
      
    });



  }


  

  // Estimate popup

  // presentConfirm(test) {
    
  //   let data = 45;
  //   const alert = this.alertCtrl.create({
  //     title: 'Estimate',
  //     message: 'Total Tentative amount=' + data + "" + test,
  //     buttons: [
  //       {
  //         text: 'oK',
  //         role: 'oK',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       },
        
  //     ]
  //   });
  //   alert.present();
  // }




  Masters() {
    this.data = this.auth.Masters().then(response => {
      this.data = response.json();
      this.mydata = this.data.Response.VehicleTypes
      console.log(this.data.Response.VehicleTypes);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }

  Confirm(test) {
    console.log(this.date);
    let dat=new Date();
      let datee=this.datePipe.transform(dat, 'yyyy-MM-dd');
      let time=this.datePipe.transform(dat, 'HH:mm:ss');
      
      

      let flat = 17.450295;
      let flong = 78.406202;
      let tlat = 17.444945;
      let tlong = 78.444168;
      let pickup = "Site-3 Borabanda, Hyderabad, Telangana";
      let drop = "Sanjeeva Reddy Nagar";
    // let flat = this.flat;
    // let flong = this.flng;
    // let tlat = this.tlat;
    // let tlong = this.tlat;
    // let pickup = this.from;
    // let drop = this.to;
    let mgs = "test";
    let date = datee+""+time;
   console.log(date);
    for (var i = 0; this.data.Response.VehicleTypes[i]; i++) {

      if (this.data.Response.VehicleTypes[i].Type == test) {
        this.MVTID = this.data.Response.VehicleTypes[i].MVTID;
        console.log(this.MVTID);
      }
    }
    for (var i = 0; this.data.Response.BookingTypes[i]; i++) {

      if (this.data.Response.BookingTypes[i].Type == this.Ttype) {
        this.masterBTID = this.data.Response.BookingTypes[i].MBTID;
        console.log(this.masterBTID);
      }
    }
    this.auth.BookVehicle(this.connectionid, this.MVTID, flat, flong, tlat, tlong, pickup, drop, mgs, date, this.masterBTID).then(res => {
      let data = res.json();
      let bookingdata
      console.log(data.Response);
      console.log(data.Status);
      res.json().data
      this.Bookdata=data.Status;
      if (data.Status == true) {
        // this.navCtrl.push(DriverConfirmationPage, {
        //    });
        const alert = this.alertCtrl.create({
          title: 'Booking ID',
          message: 'Booking Id is' +" "+ data.Response.BookingID,
          buttons: [
            {
              text: 'oK',
              role: 'oK',
              handler: () => {

              }
            }
          ]
        });
        alert.present();
      }
     
    })
   
  //   if(this.Bookdata==true){
  //   let loader = this.loadingCtrl.create({
  //     content: "Please wait for driver conformation...",
  //     duration: this.count
  //   });
  //   loader.present();
  // }
  }
}
