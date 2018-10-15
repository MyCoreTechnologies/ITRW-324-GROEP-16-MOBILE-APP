// list.ts Methods

// Imports for list.ts
import { MybookPage } from './../mybook/mybook';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BooklistPage } from '../booklist/booklist';
import { SubmitService } from '../../posts/app.service';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  // Array created for receiving books books list = bookList
  bookList: Array<{}> = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private submitService: SubmitService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  // Method for opening MyBookPage
  onGoToMyBooks(){
    this.navCtrl.push(MybookPage);
  }

  // Method for opening BookListPage
  onGoToBookList(){
    this.navCtrl.push(BooklistPage);
  }

  // Method for going back to the login page
  // and removes token.
  onGoToLogOut(){
    this.navCtrl.popToRoot();
    sessionStorage.clear();
  }

  // Get method to receive book list from webservice
  getMyBookList(){

    //Sends request for web service
    this.submitService.getMyBookData()

    //Web service sends book list
    .subscribe(response => {
      console.log(response);
    },
    (error) => console.log('Problem accuired during book retrieval.'));
  }

}
