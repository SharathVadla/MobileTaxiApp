import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LocationAccuracy} from '@ionic-native/location-accuracy';


import { HomePage } from '../pages/home/home';
import{MybookingsPage}from'../pages/mybookings/mybookings';
import{LoginPage} from '../pages/login/login';
import{CancelBookingPage} from '../pages/cancel-booking/cancel-booking';
import{DriverConfirmationPage}from'../pages/driver-confirmation/driver-confirmation';
import{DriverTrackPage}from'../pages/driver-track/driver-track';  
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   @ViewChild(Nav) nav: Nav;

  rootPage:any;

  pages: Array<{title: string, component: any}>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private locationAccuracy:LocationAccuracy) {
     
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(platform.is('cordova')){
          this.locationAccuracy.canRequest().then((canRequest: boolean) => {

        if (canRequest) {
          // the accuracy option will be ignored by iOS
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () => {console.log('Request successful')
            // this.rootPage=LoginPage;
            this.checkPreviousAuthorization();
          },
            error =>{
               platform.exitApp();
              console.log('Error requesting location permissions', error);
            }
          );
        }else{
          this.checkPreviousAuthorization();
        }
      });
      }else{
       this.checkPreviousAuthorization();
      }
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'MyBookings', component: MybookingsPage },
      { title: 'OtpPage', component: DriverTrackPage },
      { title: 'Login', component: LoginPage },
    ];
  }

  openPage(page) {
    
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

  }
  checkPreviousAuthorization(): void { 
    if((window.localStorage.getItem('acesstoken') === "undefined" || window.localStorage.getItem('acesstoken') === null)) {
      
      this.rootPage = LoginPage;
    } else {
     this.rootPage = HomePage;
    }
  }
}

