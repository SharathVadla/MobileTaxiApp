import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AutocompletePage} from '../pages/autocomplete/autocomplete';
import{ConfirmPage} from '../pages/confirm/confirm';
import{LoginPage} from '../pages/login/login';
import{MybookingsPage}from'../pages/mybookings/mybookings';
import{CancelBookingPage}from'../pages/cancel-booking/cancel-booking';
import{BookingDetailsPage}from'../pages/booking-details/booking-details';
import{DriverConfirmationPage}from'../pages/driver-confirmation/driver-confirmation'; 
import{DriverTrackPage}from'../pages/driver-track/driver-track'; 
import { GoogleMaps,Geocoder } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation'
import { DatePicker } from '@ionic-native/date-picker';
import { ServicesProvider } from '../providers/services/services';
import {LocationAccuracy} from '@ionic-native/location-accuracy';
// import { SignalRModule } from 'ng2-signalr'; 
// import { SignalRConfiguration } from 'ng2-signalr';
// import { SignalrserviceProvider } from '../providers/signalrservice/signalrservice';
import {RoundProgressModule } from 'angular-svg-round-progressbar';

// export function createConfig(): SignalRConfiguration {
//   const c = new SignalRConfiguration();
//   c.hubName = 'dashboard';
//   c.url = 'http://mytaxiservices.azurewebsites.net/signalr';
//   c.logging = true;
//   return c;
// }


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AutocompletePage,
    ConfirmPage,
    MybookingsPage,
    BookingDetailsPage,
    LoginPage,
    CancelBookingPage,
    DriverConfirmationPage,
    DriverTrackPage
   
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    // SignalRModule.forRoot(createConfig),
    IonicStorageModule.forRoot(),
   RoundProgressModule
   
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AutocompletePage,
    ConfirmPage,
    MybookingsPage,
    BookingDetailsPage,
    LoginPage,
    CancelBookingPage,
    DriverConfirmationPage,
    DriverTrackPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    DatePicker,
    Geocoder,
    LocationAccuracy,
    DatePipe,
    IonicStorageModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider
    
  ]
})
export class AppModule {}
