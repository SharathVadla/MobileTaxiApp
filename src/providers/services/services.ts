import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { SignalR, SignalRConnection } from 'ng2-signalr';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the AuthserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  ApiUrl: string = "http://mytaxiservices.azurewebsites.net";
  ApiUr2: string = "http://mytaxiservices.azurewebsites.net/api/v1/Rider";
  ApiUr3: string = "http://mytaxiservices.azurewebsites.net/api/v1/Common";
  authtoken: any;
  data:any;
   token:any;
   bookingid:any;
   masterdata:any;
   history;
  constructor(public http: Http, ) {
    console.log('Hello AuthserviceProvider Provider');
  }

  
  // sendSignalrConnectionid(connectionid){
  //   let options=this.setHeaders(this.token)
  //    let query="?connection_id="+connectionid;
  //    let body;
  //     return this.http
  //     .post(this.ApiUr2+"/Connect"+ query,body,options)
  //     .toPromise()
  //     .then((res:Response) => {
  //       console.log(res.json().Status);
  //     });
  //  }

// getConnection(){
// return this.signalr.createConnection();
// }
   setHeaders<RequestOptions>(token){
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' +  window.localStorage.getItem('acesstoken'));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    let options = new RequestOptions({ headers: headers });
      return options
  }

  validateMobile(mobile){
    console.log("enter");
    let query="?mobile_no="+mobile;
      return this.http.get(this.ApiUr2+"/ValidateMobile?mobile_no="+mobile)
    //  return this.http.get(this.ApiUr2+"/ValidateMobile?mobile_no=",query)
    .toPromise()
    .then(response => {
      return new Promise((resolve, reject) => {
      resolve(response);
      console.log(response);
       });
    }).catch(this.handleError);
  
  }

  Authentication(mobile,password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    var body = new URLSearchParams();
  //  let options=this.setHeaders(this.token)
  body.append('grant_type', 'password');
  body.append('userName', ""+mobile);
  body.append('password', ""+password);
  body.append('AppType', 'R');
        return this.http.post(this.ApiUrl+"/authToken",body,options) 
        .toPromise()
        .then(res =>{
          
          let details = res.json();
          this.token=details.access_token;
          window.localStorage.setItem('acesstoken',this.token)
          console.log(details.access_token);
          return new Promise((resolve, reject) => {
            resolve(res);
           });
        
        }).catch(this.handleError);
    
      }
    
     History(){
    let options=this.setHeaders(this.token)
    return this.http.get(this.ApiUr2+"/history",options)
    .toPromise()
    .then(response => {
      return new Promise((resolve, reject) => {
      resolve(response);
      this.history=this.data.Response
      console.log(response);
     });
    }).catch(this.handleError);
    
  }
      
      
  registerMobile(mobile,name,Email){
    let query="?mobile_no="+mobile;
    let body;
    query=query+"&name="+name;
    query=query+"&email_id="+Email;
    console.log(query);
 return this.http
 .post(this.ApiUr2+"/Register"+query,body)
 .toPromise()
 .then(res => {
  return new Promise((resolve, reject) => {
    resolve(res);
    let reg=res.json();
     console.log(res);
     console.log(reg);
     console.log(reg.Status);
    //  res.json().data
  });
   } ).catch(this.handleError);
  }

  Masters(){
    return this.http.get(this.ApiUr3+"/Masters")
    .toPromise()
    .then(response => {
      return new Promise((resolve, reject) => {
      resolve(response);
      this.masterdata=this.data.Response
      console.log(response);
     });
    }).catch(this.handleError);
    
  }

  
  BookVehicle (conntionid,vtid,flat,flong,tlat,tlong,pickup,drop,mgs,date,btid){
    console.log(this.token);
    let options=this.setHeaders(this.token)
    let query="?Connection_ID="+conntionid;
    query=query+"&VTID="+vtid;
    query=query+"&From_Latitude="+flat;
    query=query+"&From_Longitude="+flong;
    query=query+"&To_Latitude="+tlong;
    query=query+"&To_Longitude="+tlong;
    query=query+"&Pickup_Point="+pickup;
    query=query+"&Dropoff_Point="+drop;
    query=query+"&Message="+mgs;
    query=query+"&SchedulePickUpOn="+date;
    query=query+"&BTID="+btid;
    query=query+"&Package_Name=";
    query=query+"&Package_Code=";
    query=query+"&Package_Vehicle_Name=";
    query=query+"&Package_Source_Location=";
    query=query+"&Package_Destination_Location=";
    query=query+"&Package_Duration=";
    query=query+"&Package_Extra_HourRate=";
    query=query+"&Package_KMLimit=";
    query=query+"&Package_ExtraKMRate=";
    query=query+"&Package_Price=";
    query=query+"&Package_Type=";
    query=query+"&Package_Time_From=";
    query=query+"&Package_Time_To=";
    query=query+"&Package_Inclusive=";
    query=query+"&Package_Exclusive=";
    console.log(query);
 return this.http
 .post(this.ApiUr2+"/BookVehicle", query,options)
  .toPromise()
 .then(response => {
     return new Promise((resolve, reject) => {
     resolve(response);
     let details=response.json();
    // this.bookingid=details.Response.BookingID
     console.log(response);
    });
   }) 
 .catch(this.handleError);
  }


  CancelBooking(bookingid){
    let options=this.setHeaders(this.token)

    let cancelMBSID
    // for(var i=0;this.masterdata.BookingStatus[i];i++){
    //   if(this.masterdata.BookingStatus[i].StatusText=="Rider Cancel"){
    //     cancelMBSID=this.masterdata.BookingStatus[i].MBSID;
    //   }
    // }
    // let query="?BID="+bookingid;
    // query=query+"&BSID="+cancelMBSID;
    // query=query+"&Message=test";
    let query="?BID=27cd49cf-3e1d-42cf-a81f-0b3b2de49e30";
    query=query+"&BSID=b618d50a-3a1f-47f4-8915-4b56e5dfcd55";
    query=query+"&Message=test";
 return this.http
 .post(this.ApiUr2+"/CancelBooking",query,)
 .toPromise()
 .then(response => {
  return new Promise((resolve, reject) => {
  resolve(response);
 
  console.log(response);
 });
}) 
    .catch(this.handleError);
  }


private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
 
  return Promise.reject(error.message || error);
}
}
