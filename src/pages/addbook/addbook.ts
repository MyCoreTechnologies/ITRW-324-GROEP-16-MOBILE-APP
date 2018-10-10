import { SubmitService } from '../../posts/app.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-addbook',
  templateUrl: 'addbook.html',
})

export class AddbookPage {

  bookAdd = {};
  data;
  sysDate: String = new Date().toISOString();
  constructor(public navCtrl: NavController, private submitService: SubmitService) {

  }

  postAddBook(form: NgForm ) {
    console.log(form.value);
   // form.value.patchValue({"date_placed": "sysDate"});
    this.submitService.postBookData(form.value)
    .subscribe(response => {
      console.log(response);
    },
      (error) => console.log('Problem accuired during book add.'));
    } 

    onGoToBackMyBooks(){
      this.navCtrl.pop();
    }
}
