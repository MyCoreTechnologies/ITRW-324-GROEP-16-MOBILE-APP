//This file is used to store all methods and functionality that is used on 
//the AddBook page of the mobile application.

//Imports that this page requires to operate correctly
import { SubmitService } from '../../posts/app.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-addbook',
  templateUrl: 'addbook.html',
})

export class AddbookPage {
  
  //////////////////////////////////////////////////////////////////////////////////
  // Creation of the variable/s that is required to diaplay the book information 
  bookAdd = {};
  /////////////////////////////////////////////////////////////////////////////////
  
  constructor(public navCtrl: NavController, 
              private submitService: SubmitService,
              public alertCtrl: AlertController) {}

  /////////////////////////////////////////////////////////////////////////////////
  // Alert method is created for displaying an alert if invalid information is entered
  /////////////////////////////////////////////////////////////////////////////////
  showInvalidAlert() {
    const invalidAlert = this.alertCtrl.create({
      title: 'Wrong',
      subTitle: `On or more details entered is invalid.`,
      buttons: ['OK']
    });
    invalidAlert.present();
  }

  /////////////////////////////////////////////////////////////////////////////////
  // Add book Method
  // POST method to send entered book details to the web service
  // Data send: Book information
  //            Valid Token
  // Data received: Successful or Unsuccessful
  /////////////////////////////////////////////////////////////////////////////////
  postAddBook(form: NgForm ) {
    // Request send to the web service
    this.submitService.postBookData(form.value)

    // Web service takes the book details and puts it in the database.
    .subscribe(response => {
      console.log(response);
      this.onGoToBackMyBooks();
    },
      //When Wrong details are entered, an alert will appear.
      (error) => {console.log('Problem accuired during book add.');
      this.showInvalidAlert()});
    } 
    
  /////////////////////////////////////////////////////////////////////////////////
  // Method to remove curent page and go back to previous page.
  /////////////////////////////////////////////////////////////////////////////////
  onGoToBackMyBooks(){
    this.navCtrl.pop();
  }
    
}
