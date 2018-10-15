//addbook.ts Methods

//Imports for addbook.ts
import { SubmitService } from '../../posts/app.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-addbook',
  templateUrl: 'addbook.html',
})

export class AddbookPage {

  // Create variable:
  // Values of book details added with input = bookAdd 
  bookAdd = {};

  sysDate: String = new Date().toISOString();
  constructor(public navCtrl: NavController, private submitService: SubmitService) {

  }

  // POST method to send entered book details to the web service
  postAddBook(form: NgForm ) {
    console.log(form.value);
   // form.value.patchValue({"date_placed": "sysDate"});
    // Request send to the web service
    this.submitService.postBookData(form.value)

    // Web service takes the book details and puts it in the database.
    .subscribe(response => {
      console.log(response);
    },
      (error) => console.log('Problem accuired during book add.'));
    } 

    // Method to remove previous page; go back to previous page.
    onGoToBackMyBooks(){
      this.navCtrl.pop();
    }
}
