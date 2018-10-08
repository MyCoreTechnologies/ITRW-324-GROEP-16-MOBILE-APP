import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BooklistPage} from '../booklist/booklist';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    console.log(navParams.get(this.newMethod()));
  }
  public goToBookList() {
    this.navCtrl.push(BooklistPage);
  } 
  

  private newMethod(): string {
    return 'val';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
