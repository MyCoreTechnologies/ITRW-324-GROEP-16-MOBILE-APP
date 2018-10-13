import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddbookPage } from '../addbook/addbook';
import { AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { SubmitService } from '../../posts/app.service';

@IonicPage()
@Component({
  selector: 'page-mybook',
  templateUrl: 'mybook.html',
})

// class myBook{
//   Book_Number: number;
//   Book_Name: string;
//   Book_Edition: string;
//   Book_Price: number;
//   Book_type: string;
//   Author_Name: string;
//   Subject_Code: string;
// }

export class MybookPage {
  // data: any[];

  // data;
  // bookNumber;
  // bookName;
  // edition;
  // price;
  // type;
  // author;
  // subject;
  // arr = 0;
  // tableLabel;
  // tableData = [];  

  // books: myBook[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private submitService: SubmitService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MybookPage');
  }

  onToGoAdd(){
    this.navCtrl.push(AddbookPage);
  }

  showRemovePrompt(){
    const prompt = this.alertCtrl.create({
          title: 'Remove',
          message: "Enter the NUMBER of the book that you want to remove.",
          inputs: [{
          name: 'book_number',
          placeholder: 'E.g. 35'
        },],
      buttons: 
      [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: data => {
            console.log('Removed clicked');
            this.postRemoveBook(data);
          }
        }
      ]
    });
    prompt.present();
  }

  onGoToMenu(){
     this.navCtrl.pop();
  }

  showHelpAlert() {
    const helpAlert = this.alertCtrl.create({
      title: 'Help!',
      subTitle: `This is a list of all your books, you can add more or remove books.`,
      buttons: ['OK']
    });
    helpAlert.present();
  }

  postRemoveBook(data) {
    console.log(data);
    this.submitService.postDeleteBookData(data)
    .subscribe(response => {
      console.log(response);
    },
      (error) => console.log('Problem accuired during book remove.'));
    } 

  getBookList(){
    this.submitService.getMyBookData()
    .subscribe(response => {
      console.log(response);

     // this.books = response[0];

      // this.tableLabel = response[0].labels;

      // let arr = 0;
      // while(response[arr] != null){
      //   this.tableData.push(response[arr]);
      //   arr++;
      // }

      // console.log(this.tableData);
      // console.log(this.tableLabel);

      // this.data = response;
      // this.bookNumber = this.data[this.arr].Book_Number;
      // this.bookName = this.data[this.arr].Book_Name;
      // this.edition = this.data[this.arr].Book_Edition;
      // this.type = this.data[this.arr].Book_Type;
      // this.author = this.data[this.arr].Author_Name;
      // this.subject = this.data[this.arr].Subject_Code;

    },
    (error) => console.log('Problem accuired during book retrieval.'));
  }  

}

 


