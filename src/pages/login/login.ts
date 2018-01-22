import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { Http, Headers, RequestOptions, Response,URLSearchParams } from '@angular/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

signup:boolean;
OTP:boolean = false;
data:any;
MobileValidate:any;
regdata:any;
mobiledata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: ServicesProvider, public http: Http) {
  this.signup=true; 
  }
  
  validate(mobile){
    console.log("valid");
    this.signup=false;
  this.auth.validateMobile(mobile) .then(response => {
    this.data=response.json();
    response.json().data
    console.log(this.data)
    console.log(this.data.Status)
   this.MobileValidate= this.data.Status
this.mobiledata=this.data.StatusMessage
   console.log(this.MobileValidate);
 if(this.data.Status==true){
   alert("OTP is send to you Register Email ID");
 }
    })
  }
  Register(mobile,name,Email){
this.auth.registerMobile(mobile,name,Email) .then(response => {
  this.data=response;
  let reg=response.json();
  //response.json().data
  //this.regdata=reg.Status;
  console.log(reg.Status);
  if(reg.Status){
    this.MobileValidate=true;
  }

    })
  }
otp(mobile,otp){
  console.log("otp");
  this.auth.Authentication(mobile,otp).then(response => {
    let data=response.json();
    console.log(data);
    console.log(data.access_token)
    if(data.access_token!==undefined){
      this.navCtrl.setRoot(HomePage, {});
            
    }else{
      alert("Invalid OTP");
    }
    
      })
}
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
