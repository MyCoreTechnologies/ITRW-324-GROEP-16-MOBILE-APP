//addbook.ts Methods

//Imports for addbook.ts
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
  
  //=============================================================================
  // Create variable:
  // Values of book details added with input = bookAdd 
  bookAdd = {};
  //=============================================================================
  
  constructor(public navCtrl: NavController, 
              private submitService: SubmitService,
              public alertCtrl: AlertController) {

  }

  //=============================================================================
  // Alert method for displaying a invalid details error.
  //=============================================================================
  showInvalidAlert() {
    const invalidAlert = this.alertCtrl.create({
      title: 'Wrong!',
      subTitle: `On or more details entered is invalid.`,
      buttons: ['OK']
    });
    invalidAlert.present();
  }

  //=============================================================================
  // POST method to send entered book details to the web service
  //=============================================================================
  postAddBook(form: NgForm ) {

    console.log(form.value);
    // Request send to the web service
    this.submitService.postBookData(form.value)

    // Web service takes the book details and puts it in the database.
    .subscribe(response => {
      console.log(response);
      this.onGoToBackMyBooks();
    },
      //When Wrong details are entered, a alert will appear.
      (error) => {console.log('Problem accuired during book add.');
      this.showInvalidAlert()});
    } 
    
    //=============================================================================
    // Method to remove previous page; go back to previous page.
    //=============================================================================
    onGoToBackMyBooks(){
      this.navCtrl.pop();
    }
    
}
