import { Component, ViewChild, ElementRef,EventEmitter } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Platform ,AlertController} from "ionic-angular";
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
import { DatePipe } from '@angular/common';
import{DriverTrackPage}from'../driver-track/driver-track'; 
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { DatePicker } from '@ionic-native/date-picker';
import { AutocompletePage } from '../autocomplete/autocomplete';
import { ConfirmPage } from '../confirm/confirm';
import{DriverConfirmationPage}from'../driver-confirmation/driver-confirmation';
// import { SignalR, SignalRConnection } from 'ng2-signalr';
import { ServicesProvider} from '../../providers/services/services'
//import { SignalrserviceProvider} from '../../providers/signalrservice/signalrservice'
declare var google: any;
declare var plugin: any;
/**
 * Generated class for the AddMarkerClusterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  autocompleteItems: any;
  autocomplete: any;
  acService: any;
  user: any;
  geo: any;
  location: any;
  car;
  icon;
  markers: any[] = [];
  iconslist: any[] = [];
  pickupmarker: Marker;
  dropmarker: Marker;
  latlngbounds;
  currentlatlng: any = {};
  droplatlng: any = {};
  pickuplatlng: any = {};
  triptype: string = "Local";
  flat:any;
  flng:any;
  tlat:any;
  tlng:any;
  vehiclelist;
  vehicledata;
  data;
  MVTID;
  masterBTID;
  Bookdata;
  ridedate;
  onConfirmBooking;
  public connectionid;
  private connection;
  loader;
  c:any;
  public trackdata: EventEmitter < any > ; 
  constructor(public platform: Platform, public navCtrl: NavController,public storage: Storage,private datePipe: DatePipe,
    public navParams: NavParams, private _googleMaps: GoogleMaps,
    private _geoLoc: Geolocation,
    private loadingCtrl: LoadingController
    , private modalCtrl: ModalController,
    private datePicker: DatePicker,
    private geocode: Geocoder,
    // private signalr:SignalR,
    public alertCtrl: AlertController,
    private service:ServicesProvider,) {
    this.car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
    //this.subscribeToEvents();
    this.Masters();
    // this.connectionid=this.signalrservice.connectionid;
    this.icon = {
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
    this.autocompleteItems = [];
    this.autocomplete = {
      from: '',
      to: ''
    };

    storage.ready().then(() => {
    });
      


  }


// private subscribeToEvents(): void {  
//         // if connection exists it can call of method.  
//         this.signalrservice.connectionEstablished.subscribe(() => {  
//             console.log("connection established");  
//             this.intervalforheartBeat();
//         });  
//         this.signalrservice.signalrid.subscribe((data) => {  
//             this.connectionid=data;
//         });  
//         // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
//         this.signalrservice.onHeartBeat.subscribe((message: any) => {  
//              console.log(message);
//         }); 
       
//         this.signalrservice.onTripStart.subscribe((message: any) => {
//           console.log(message);
         
//         });
//         this.signalrservice.onTripEnd.subscribe((message: any) => {
//          console.log(message)
//         });
    
//         this.signalrservice.onConfirmBooking.subscribe((message: any) => {  
//           console.log(message);
//           this.loader.dismiss();
//           this.navCtrl.push(DriverTrackPage, {
//             name: message.d,
//             mobile: message.e,
//             taxi: message.h
//            });
//      });  
//     } 
     
  intervalforheartBeat(){
    // setInterval(() => { 
    //     this.signalrservice.invokeheartbeat();
    //  }, 20000);

     this.Masters();
     
  }



  Masters() {
    this.data = this.service.Masters().then(response => {
      let data = response.json();
      this.vehiclelist = data.Response.VehicleTypes
      this.data=data;
      this.vehicledata=this.vehiclelist[0].Type;
      console.log(this.vehiclelist);
      console.log(data);
    })
  }


  public getConnection(){
    return this.connection;
  }
  ngAfterViewInit() {
    let loc: LatLng;
    this.initMap();

    //once the map is ready move
    //camera into position
    this.getLocation().then(res => {
      //Once location is gotten, we set the location on the camera.
      loc = new LatLng(res.coords.latitude, res.coords.longitude);
      this.getAddress(loc);
     this.flat=res.coords.latitude;
      this.flng=res.coords.longitude;
// alert(res.coords.latitude+""+res.coords.longitude);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      //Get User location
             this.moveCamera(loc);
        let iconurl = "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_purpleS.png"
       
        this.createMarker(loc, iconurl).then((marker: Marker) => {
         // alert("marker added");
          this.pickupmarker = marker;
          console.log(marker);
          // marker.showInfoWindow();
          marker.on(GoogleMapsEvent.MARKER_DRAG_END)
            .subscribe((mark) => {
              mark.getPosition((latLng) => {
                this.getAddress(latLng);
              });
            });
        }).catch(err => {
          console.log(err);
        });

      }).catch(err => {
        console.log(err);
      });

    });
  }

  //Load the map 
  initMap() {
    let element = this.mapElement.nativeElement;
    let mapOptions: GoogleMapOptions = {
      controls: {
        myLocationButton: true
      }
    };
    this.map = this._googleMaps.create('map', mapOptions);
    // this.map = new GoogleMap(element, mapOptions);
  }

  //Get current user location
  //Returns promise
  getLocation() {
    return this._geoLoc.getCurrentPosition();
  }


  //Moves the camera to any location
  moveCamera(loc: LatLng) {
    let options: CameraPosition<LatLng> = {
      //specify center of map
      target: loc,
      zoom: 15,
    }
    this.map.moveCamera(options)
  }

  //Adds a marker to the map
  createMarker(loc: LatLng, icon: string) {
    let markerOptions: MarkerOptions = {
      position: loc,
      icon: icon
    };

    return this.map.addMarker(markerOptions);
  }

  rideLater(vehicledata) {
    console.log("ridelater button ");
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      allowOldDates: false,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      data => {
        console.log('Got date: ', data);
      this.ridedate=data;
      for (var i = 0; this.data.Response.VehicleTypes[i]; i++) {
        
              if (this.data.Response.VehicleTypes[i].Type == vehicledata) {
                this.MVTID = this.data.Response.VehicleTypes[i].MVTID;
                console.log(this.MVTID);
              }
            }
            for (var i = 0; this.data.Response.BookingTypes[i]; i++) {
        
              if (this.data.Response.BookingTypes[i].Type == this.triptype) {
                this.masterBTID = this.data.Response.BookingTypes[i].MBTID;
                console.log(this.masterBTID);
              }
            }
            let dat=new Date();
            let datee=this.datePipe.transform(this.ridedate, 'yyyy-MM-dd');
            let time=this.datePipe.transform(this.ridedate, 'HH:mm:ss');
            let mgs="test";
            let date=datee+""+time;
           
            // let flat = 17.450295;
            // let flong = 78.406202;
            // let tlat = 17.444945;
            // let tlong = 78.444168;
            // let pickup = "Site-3 Borabanda, Hyderabad, Telangana";
            // let drop = "Sanjeeva Reddy Nagar";
            console.log(date);
           //this.service.BookVehicle(this.connectionid, this.MVTID, flat, flong, tlat, tlong, pickup, drop, mgs, date, this.masterBTID).then(res => {
       this.service.BookVehicle(this.connectionid, this.MVTID, this.flat, this.flng, this.tlng, this.tlat, this.autocomplete.from, this.autocomplete.to, mgs, date, this.masterBTID).then(res => {
        let data = res.json();
        let bookingdata
        console.log(data.Response);
        console.log(data.Status);
        res.json().data
        this.Bookdata=data.Status;
        if (data.Status == true) {
          this.loader = this.loadingCtrl.create({
              content: "Please wait for driver conformation...",
              duration: 100000
            });
            this.loader.present();
            
          // this.navCtrl.push(DriverTrackPage, {
          // });
          // const alert = this.alertCtrl.create({
          //   title: 'Booking ID',
          //   message: 'Booking Id is' +" "+ data.Response.BookingID,
          //   buttons: [
          //     {
          //       text: 'oK',
          //       role: 'oK',
          //       handler: () => {
  
          //       }
          //     }
          //   ]
          // });
          // alert.present();
        }
       
      })
  
      },
      err => console.log('Error occurred while getting date: ', err)
      );
    console.log("ridelater button end");
   
   
  }


  ridenow(vehicledata) {

    for (var i = 0; this.data.Response.VehicleTypes[i]; i++) {
      
            if (this.data.Response.VehicleTypes[i].Type == vehicledata) {
              this.MVTID = this.data.Response.VehicleTypes[i].MVTID;
              console.log(this.MVTID);
            }
          }
          for (var i = 0; this.data.Response.BookingTypes[i]; i++) {
      
            if (this.data.Response.BookingTypes[i].Type == this.triptype) {
              this.masterBTID = this.data.Response.BookingTypes[i].MBTID;
              console.log(this.masterBTID);
            }
          }
          let dat=new Date();
          let datee=this.datePipe.transform(dat, 'yyyy-MM-dd');
          let time=this.datePipe.transform(dat, 'HH:mm:ss');
          let mgs="test";
          let date=datee+""+time;

          // let flat = 17.450295;
          // let flong = 78.406202;
          // let tlat = 17.444945;
          // let tlong = 78.444168;
          // let pickup = "Site-3 Borabanda, Hyderabad, Telangana";
          // let drop = "Sanjeeva Reddy Nagar";
          console.log(date);
  // this.service.BookVehicle(this.connectionid, this.MVTID, flat, flong, tlat, tlong, pickup, drop, mgs, date, this.masterBTID).then(res => {
  this.service.BookVehicle(this.connectionid, this.MVTID, this.flat, this.flng, this.tlng, this.tlat, this.autocomplete.from, this.autocomplete.to, mgs, date, this.masterBTID).then(res => {
      let data = res.json();
      let bookingdata
      console.log(data.Response);
      console.log(data.Status);
      res.json().data
      this.Bookdata=data.Status;
       if (data.Status == true) {
       this.loader = this.loadingCtrl.create({
              content: "Please wait for driver conformation...",
              duration: 100000
            });
            this.loader.present();
        // this.navCtrl.push(DriverTrackPage, {});
        
        // const alert = this.alertCtrl.create({
        //   title: 'Booking ID',
        //   message: 'Booking Id is' +" "+ data.Response.BookingID,
        //   buttons: [
        //     {
        //       text: 'oK',
        //       role: 'oK',
        //       handler: () => {

        //       }
        //     }
        //   ]
        // });
        // alert.present();
      }
     
    })
   
  }

  getLatLng(address, status) {
    this.geocode.geocode({
      "address": address
    }).then(results => {
      console.log(results[0].position);

      if (status == "from") {
        this.pickuplatlng = results[0].position;
        // alert(this.pickuplatlng);
        console.log(this.pickuplatlng);
        //this.flat=this.pickuplatlng.lat;
        // alert(this.pickuplatlng.lat+""+this.pickuplatlng.lng);
      
       this.flat=this.pickuplatlng.lat;
        this.flng=this.pickuplatlng.lng;
        // this.flng=this.pickuplatlng.lng;
        this.pickupmarker.setPosition(new LatLng(this.pickuplatlng.lat, this.pickuplatlng.lng));
      }
      else if (status == "to") {
        console.log(this.dropmarker);
       
        this.droplatlng = results[0].position;
        // alert(this.droplatlng);
        console.log(this.droplatlng);
        this.tlng=this.droplatlng.lat;
        this.tlat=this.droplatlng.lng;
       
        // alert(this.droplatlng.lat+""+this.droplatlng.lng)
        this.flat=this.droplatlng.lat;
        if (this.dropmarker == undefined) {
          this.map.addMarker({
            position: {
              lat: this.droplatlng.lat,
              lng: this.droplatlng.lng
            },
            icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_redD.png',
            draggable: true
          }).then((marker: Marker) => {
            this.dropmarker = marker;
            console.log("dropmarker  added");

          });
        } else {
          this.dropmarker.setPosition({
            lat: this.droplatlng.lat,
            lng: this.droplatlng.lng,
          });
        }
       
        // var points = [new plugin.google.maps.LatLng(this.currentlatlng.latitude, this.currentlatlng.longitude),
        var points = [new plugin.google.maps.LatLng(this.flat, this.flng),
        new plugin.google.maps.LatLng(this.droplatlng.lat, this.droplatlng.lng),
        ];
        this.latlngbounds = new plugin.google.maps.LatLngBounds(points);
        this.map.animateCamera({
          'target': this.latlngbounds
        });
        this.latlngbounds.extend(results[0].position);
        this.map.animateCamera({
          target: this.latlngbounds
        })
      }
    })
  }



  getMyLocation() {
    // let watch = this._geoLoc.getCurrentPosition();
    // watch.then((data) => {
this.map.getMyLocation().then((location) => {
      // this.location = new LatLng(data.coords.latitude, data.coords.longitude);
      this.map.setCameraZoom(16);
      this.map.animateCamera({
        target: location.latLng
      })
    
    })
    // this.map.on(GoogleMapsEvent.MY_LOCATION_BUTTON_CLICK).subscribe(()=>{
    //   console.log("currentlocation button clicked");
    // })
  }


  getAddress(latlang) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlang }, (results, status) => {
      console.log(results);
      this.autocomplete.from = results[0].formatted_address;
    });
  }


  showFromAuto() {
    let modal = this.modalCtrl.create(AutocompletePage, { source: 'from' });
    modal.onDidDismiss(data => {
      this.autocomplete.from = data;
      this.getLatLng(this.autocomplete.from, "from");
    });
    modal.present();
  }

  showToAuto() {
    let modal = this.modalCtrl.create(AutocompletePage, { source: 'to' });
    modal.onDidDismiss(data => {
      this.autocomplete.to = data;
      this.getLatLng(this.autocomplete.to, "to");
    });
    modal.present();
  }
}