import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the BooklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booklist',
  templateUrl: 'booklist.html',
})
export class BooklistPage {

  filterRadioOpen: boolean;
  filterRadioResult;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BooklistPage');
  }

  onGoToBackList(){
    this.navCtrl.push(ListPage);
  }

  showFilter(){
    let alertFilter = this.alertCtrl.create();
    alertFilter.setTitle('Select a filter');

    alertFilter.addInput({
      type: 'radio',
      label: 'Type',
      value: 'type',
      checked: false
    });

    alertFilter.addInput({
      type: 'radio',
      label: 'Subject code',
      value: 'code',
      checked: false
    });

    alertFilter.addInput({
      type: 'radio',
      label: 'Price',
      value: 'price',
      checked: false
    });

    alertFilter.addButton('Cancel');
    alertFilter.addButton({
      text: 'OK',
      handler: filterData => {
        this.filterRadioOpen = false;
        this.filterRadioResult = filterData;

        if(filterData === 'type'){
          this.showFilterTypePrompt();
        } else if(filterData === 'code') {
          this.showFilterSubjectPrompt();
        } else if(filterData === 'price') {
          this.showFilterPricePrompt();
        }

      }
    });
      alertFilter.present().then(() => {
      this.filterRadioOpen = true;
    });
  }

  showFilterTypePrompt(){
    const filterTprompt = this.alertCtrl.create({
          title: 'Type Filter',
          message: "Enter the TYPE of the book that you want to filter.",
          inputs: [{
          name: 'book_type',
          placeholder: 'E.g. advertisement OR request'
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
          text: 'Apply',
          handler: data => {
            console.log('Apply clicked');
          }
        }
      ]
    });
    filterTprompt.present();
  }

  showFilterSubjectPrompt(){
    const filterSprompt = this.alertCtrl.create({
          title: 'Subject Filter',
          message: "Enter the SUBJECT CODE of the book that you want to filter.",
          inputs: [{
          name: 'subject_code',
          placeholder: 'E.g. ITRW324'
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
          text: 'Apply',
          handler: data => {
            console.log('Apply clicked');
          }
        }
      ]
    });
    filterSprompt.present();
  }

  showFilterPricePrompt(){
    const filterPprompt = this.alertCtrl.create({
          title: 'Price Filter',
          message: "Enter the maximum PRICE of the book that you want to filter.",
          inputs: [{
          name: 'book_price',
          placeholder: 'E.g. 350'
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
          text: 'Apply',
          handler: data => {
            console.log('Apply clicked');
          }
        }
      ]
    });
    filterPprompt.present();
  }

  showHelpAlert() {
    const helpAlert = this.alertCtrl.create({
      title: 'Help!',
      subTitle: `This is a list of all available books, you can filter book according Type, Subject and Code.`,
      buttons: ['OK']
    });
    helpAlert.present();
  }

}
