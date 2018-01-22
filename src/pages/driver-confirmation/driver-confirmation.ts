import { Component,ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services'
import { Storage } from '@ionic/storage';
import {RoundProgressEase } from 'angular-svg-round-progressbar';
// import { SignalrserviceProvider} from '../../providers/signalrservice/signalrservice';
import{DriverTrackPage}from'../driver-track/driver-track'; 
import { DatePipe } from '@angular/common';
/**
 * Generated class for the DriverConfirmationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-driver-confirmation',
  templateUrl: 'driver-confirmation.html',
  encapsulation: ViewEncapsulation.None
})
export class DriverConfirmationPage {
  public n: number = 1;
  current: number = 0;
  max: number = 100;
  stroke: number = 15;
  radius: number = 125;
  semicircle: boolean = false;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = true;
  color: string = '#45ccce';
  background: string = '#eaeaea';
  duration: number = 8;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  animations: string[] = [];
  gradient: boolean = false;
  realCurrent: number = 0;
  connectionid;
  confirm:any;
  timer;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _ease: RoundProgressEase,private service:ServicesProvider,
    public storage: Storage,private datePipe: DatePipe) {
      this.subscribeToEvents();
    for (let prop in _ease) {
      if (prop.toLowerCase().indexOf('ease') > -1) {
        this.animations.push(prop);
      };
    }
    
  }

  private subscribeToEvents(): void {  
    // if connection exists it can call of method.  
//     this.signalrservice.connectionEstablished.subscribe(() => {  
//         console.log("connection established");  
//         this.intervalforheartBeat();
//     });  
//     this.signalrservice.signalrid.subscribe((data) => {  
//         this.connectionid=data;
//     });  
//     // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
//     this.signalrservice.onHeartBeat.subscribe((message: any) => {  
//          console.log(message);
//     }); 
//     this.signalrservice.onBookedVehiclePositionChange.subscribe((message: any) => {  
//       console.log(message);
//  }); 
//  this.signalrservice.onConfirmBooking.subscribe((message: any) => {  
//         console.log(message);
//         if(message){
//           this.confirm=true;
  //       }
  //  }); 
} 
 
intervalforheartBeat(){
// setInterval(() => { 
//     this.signalrservice.invokeheartbeat();
//  }, 20000);
 
}

ngAfterViewInit() {
 this.timer= setTimeout(() => {
    this.current= this.n + 10;
    console.log(this.current);
  }, 20000);
    
  setInterval(() => {
    this.current= this.n + 1;
  }, 20000);
  
}
ngOnDestroy() {
  if(this.current=60){
  this.timer.unsubscribe();
  }
}
  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      'font-size': this.radius / 3.5 + 'px'
    };
  }



  
  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverConfirmationPage');
  }

  HomePage(){
    this.navCtrl.push(HomePage, {
      });
  }



}
