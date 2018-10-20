// list.ts Methods

// Imports for list.ts
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

  //=============================================================================
  // Array created for receiving books books list = bookList
  bookList: Array<{}> = [];
  //=============================================================================

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  //=============================================================================
  // Method for opening MyBookPage
  //=============================================================================
  onGoToMyBooks(){
    this.navCtrl.push(MybookPage);
  }

  //=============================================================================
  // Method for opening BookListPage
  //=============================================================================
  onGoToBookList(){
    this.navCtrl.push(BooklistPage);
  }
  
  //=============================================================================
  // Method for going back to the login page
  // and removes token.
  //=============================================================================
  onGoToLogOut(){
    this.navCtrl.popToRoot();
    sessionStorage.clear();
  }

}
