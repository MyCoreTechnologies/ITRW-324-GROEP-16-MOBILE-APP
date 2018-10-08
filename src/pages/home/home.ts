import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SearchPage} from '../search/search';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  public goToSearch() {
    this.navCtrl.push(SearchPage);
  }  
  public closeApplication(){
this.closeApplication;
  }
  

}
