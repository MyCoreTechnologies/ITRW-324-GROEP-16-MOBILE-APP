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
export class MybookPage {

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
    this.submitService.getBookListData()
    .subscribe(response => {
      console.log(response);
    },
    (error) => console.log('Problem accuired during book retrieval.'));
  }  

}

 


