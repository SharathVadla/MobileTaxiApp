import { Component, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  Marker,
  Geocoder,
  CameraPosition,
  MarkerOptions,
  GoogleMapOptions
} from "@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
// import { SignalrserviceProvider } from '../../providers/signalrservice/signalrservice'
declare var google: any;
declare var plugin: any;
/**
 *  
 * Generated class for the DriverTrackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-driver-track',
  templateUrl: 'driver-track.html',
})
export class DriverTrackPage {
  mapReady: boolean = false;
  map: GoogleMap;

  pickupmarker: Marker;
  from;

  latlngbounds;
  driverdata;
  drivername;
  drivernumber;
  taxinumber;
  flat;
  flong;
  tlat;
  tlong;
  pnum;
  date;
  name;
  mobile;
  taxi;
  public connectionid;
  trackmarker;
  car;
  vehicleicon;
  constructor(
    public navCtrl: NavController,
    // public toastCtrl: ToastController,
    private googleMaps: GoogleMaps,
    public navParams: NavParams) {
     // this.subscribeToEvents();
this.car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
     this.vehicleicon = {
      path: this.car,
      scale: .7,
      strokeColor: 'white',
      strokeWeight: .10,
      fillOpacity: 1,
      fillColor: '#404040',
      offset: '5%',
      // rotation: parseInt(heading[i]),
      anchor: new google.maps.Point(10, 25) // orig 10,50 back of car, 10,0 front of car, 10,25 center of car
    };
     this.name=navParams.get('name');
        this.mobile=navParams.get('mobile');
        this.taxinumber=navParams.get('taxi');
  }

  ionViewDidLoad() {
    console.log("driver track loaded");
    this.loadMap();
  }
  
  
  // private subscribeToEvents(): void {
  //   // if connection exists it can call of method.  
  //   this.signalrservice.connectionEstablished.subscribe(() => {
  //     console.log("connection established");
  //     // this.intervalforheartBeat();
  //   });
  //   this.signalrservice.signalrid.subscribe((data) => {
  //     this.connectionid = data;
  //   });
  //   // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
  //   this.signalrservice.onHeartBeat.subscribe((message: any) => {
  //     console.log(message);
  //   });

  //   this.signalrservice.onBookedVehiclePositionChange.subscribe((message: any) => {
  //     // console.log(message);
      
      
  //     this.flat=message.g;
  //     this.flong=message.h;
  //     console.log(this.flat+" "+this.flong);
  //     this.tracker();
    
  //   });
  //   this.signalrservice.onTripStart.subscribe((message: any) => {
  //     console.log(message);
     
  //   });
  //   this.signalrservice.onTripEnd.subscribe((message: any) => {
  //     console.log(message);
     
  //   });

    
  // }
  loadMap() {
    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.map = this.googleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 16
      },
     controls: {
        myLocationButton: true
      }
    });

    // Wait the maps plugin is ready until the MAP_READY event
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log("map created starting");
      this.mapReady = true;
    });
  }

  onButtonClick() {
    if (!this.mapReady) {
      console.log('map is not ready yet. Please try again.');
      return;
    }
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation()
      .then((location) => {
        console.log(JSON.stringify(location, null ,2));

        // Move the map camera to the location with animation
        return this.map.animateCamera({
          target: location.latLng,
          zoom: 17
        }).then(() => {
          // add a marker
          return this.map.addMarker({
            title: '@ionic-native/google-maps plugin!',
            snippet: 'This plugin is awesome!',
            position: location.latLng,
            icon:this.vehicleicon
            // animation: GoogleMapsAnimation.BOUNCE
          });
        })
      }).then((marker: Marker) => {
        // show the infoWindow
        marker.showInfoWindow();

        // If clicked it, display the alert
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
         console.log('clicked!');
        });
      });
  }


tracker(){
  console.log("in tracker");
  let loc = new LatLng(this.flat, this.flong);
  if (this.mapReady) {
    // console.log("map is ready");
    if (this.trackmarker == undefined) {
     
        // add a marker
        return this.map.addMarker({
          position: loc,
          icon: 'https://png.icons8.com/?id=245&size=30',
          // animation: GoogleMapsAnimation.BOUNCE
      }).then((marker: Marker) => {
        console.log("track marker added");
        this.trackmarker = marker;
      });
    }
    else {
      this.trackmarker.setPosition(loc);
    }
    this.map.moveCamera({
        target: loc,
        zoom: 17,
      })
  }
  }


 moveCamera(loc: LatLng) {
    let options: CameraPosition<LatLng> = {
      //specify center of map
      target: loc,
      zoom: 15,
    }
    this.map.moveCamera(options)
  }

  createMarker(loc: LatLng, icon: string) {
    let markerOptions: MarkerOptions = {
      position: loc,
      icon: icon
    };

    return this.map.addMarker(markerOptions);
  }


}
