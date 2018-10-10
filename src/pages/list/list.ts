import { MybookPage } from './../mybook/mybook';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BooklistPage } from '../booklist/booklist';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  onGoToMyBooks(){
    this.navCtrl.push(MybookPage);
  }

  onGoToBookList(){
    this.navCtrl.push(BooklistPage);
  }
}
