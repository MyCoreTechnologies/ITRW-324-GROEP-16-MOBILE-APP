import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SubmitService } from '../../posts/app.service';
import { HttpClient } from '@angular/common/http';

export interface Config {
	//bookList: string;
}

@IonicPage()
@Component({
  selector: 'page-booklist',
  templateUrl: 'booklist.html',
})
export class BooklistPage {

  filterRadioOpen: boolean;
  filterRadioResult;
  bookList: Array<any> = [];

  adData = `{"book_type": "Advertisement"}`;
  reqData = `{"book_type": "Request"}`;
  // public config : Config;
  // public columns : any;
  // public rows : any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    private submitService: SubmitService,
    private _HTTP   	: HttpClient) {
      this.getBookList();

      // this.columns = [
      //   { Name: 'book_Name'},
      //   { Type: 'book_type'},
      //   { Price: 'book_price'}
      // ];
    }

  ionViewDidLoad() : void{
    // this.submitService.getBookListData()
    //   .subscribe((data) =>
    //   {
    //      this.rows = data.bookList;
    //   });
    console.log('ionViewDidLoad BooklistPage');
  }

  onGoToMenu(){
    this.navCtrl.pop();
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
          this.showFilterType();
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

  showFilterType(){
    const confirmType = this.alertCtrl.create({
      title: "Type Filter",
      message: "Select the TYPE of the book that you want to filter.",
      buttons: [
      {
        text: "Advertisements",
          handler: data => {
            console.log('Advertisement clicked');
            this.postFilterTypeBook(this.adData);
      }
      },
      {
        text: 'Requests',
          handler: data => {
            console.log('Request clicked');
            this.postFilterTypeBook(this.reqData);
      }
      }
      ]
    });

    confirmType.present();
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
            this.postFilterSubjectBook(data);
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
            this.postFilterPriceBook(data);
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

  postFilterTypeBook(data) {
    console.log(data);
    this.submitService.postFilterTypeData(data)
    .subscribe(response => {
      console.log(response);
//      typeFilterBooks : [response];
    },
      (error) => console.log('Problem accuired during type filter.'));
    } 
    
  postFilterSubjectBook(data) {
    console.log(data);
    this.submitService.postFilterSubjectData(data)
    .subscribe(response => {
      console.log(response);
    },
      (error) => console.log('Problem accuired during subject filter.'));
    } 

  postFilterPriceBook(data) {
    console.log(data);
    this.submitService.postFilterPriceData(data)
    .subscribe(response => {
      console.log(response);
    },
      (error) => console.log('Problem accuired during price fiter.'));
    }

    getBookList(){
      this.submitService.getBookListData()
      .subscribe(
      (response) => {
        console.log(response);
        // let count = 0;
        this.bookList.push(response);
        console.log(this.bookList);
      },
        // this.bookpage.getBooks();,
      (error) => console.log('Problem accuired during book retrieval.'));
    }

}

