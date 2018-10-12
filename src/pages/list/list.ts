import { HomePage } from './../home/home';
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
  bookList: Array<{}> = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private submitService: SubmitService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  onGoToMyBooks(){
    this.navCtrl.push(MybookPage);
  }

  onGoToBookList(){
    this.navCtrl.push(BooklistPage);
  }

  onGoToLogOut(){
    this.navCtrl.popToRoot();
    sessionStorage.clear();
  }

  getMyBookList(){
    this.submitService.getMyBookData()
    .subscribe(response => {
      console.log(response);
    },
    (error) => console.log('Problem accuired during book retrieval.'));
  }

  // getBookList(){
  //   this.submitService.getBookListData()
  //   .subscribe(
  //   (response) => {
  //     // console.log(response);
  //     // let count = 0;
  //     this.bookList.push(response);
  //     console.log(this.bookList);
  //   },
  //     // this.bookpage.getBooks();,
  //   (error) => console.log('Problem accuired during book retrieval.'));
  // }
}
