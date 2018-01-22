import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the AutocompletePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google:any;
@IonicPage()
@Component({
  selector: 'page-autocomplete',
  templateUrl: 'autocomplete.html',
})
export class AutocompletePage {
 autocompleteItems;
 autocomplete;
 where;
 title;
  service = new google.maps.places.AutocompleteService();
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, private zone: NgZone) {
     this.where=navParams.get('source')
     if(this.where=='from'){
       this.title='Enter Pickup Location';
     }
     else if(this.where=='to'){
       this.title='Enter Drop Location'
     }
     this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutocompletePage');
  }
  
dismiss() {
    this.viewCtrl.dismiss();
  }
 
  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }
}
