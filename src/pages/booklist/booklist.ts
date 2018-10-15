//booklist.ts Methods

//Imports for booklist.ts
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

  // Create Variables:
  // Filter popup open or not = filterRadioOpen
  // The option chosen in the filter popup = filterRadioResult
  // Array of books recieved by the web service = bookList 
  filterRadioOpen: boolean;
  filterRadioResult;
  bookList: Array<any> = [];

  // The result choosen at type filter
  // Advertisement = adData
  // Request = reqData
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

  // Method to remove present page; going back to the previous page.
  onGoToMenu(){
    this.navCtrl.pop();
  }

  // Method to pop up a filter alert
  showFilter(){
    let alertFilter = this.alertCtrl.create();
    alertFilter.setTitle('Select a filter');

    //Filter option Type
    alertFilter.addInput({
      type: 'radio',
      label: 'Type',
      value: 'type',
      checked: false
    });

    //Filter option Subject
    alertFilter.addInput({
      type: 'radio',
      label: 'Subject code',
      value: 'code',
      checked: false
    });

    //Filter option price
    alertFilter.addInput({
      type: 'radio',
      label: 'Price',
      value: 'price',
      checked: false
    });

    // Cancel button will close filter popup
    alertFilter.addButton('Cancel');

    // Ok button will confirm the option selected and value is saved
    alertFilter.addButton({
      text: 'OK',
      // Popup will close and value is saved
      handler: filterData => {
        this.filterRadioOpen = false;
        this.filterRadioResult = filterData;

        // Value of selected option will determine which method is called
        if(filterData === 'type'){
          this.showFilterType();
        } else if(filterData === 'code') {
          this.showFilterSubjectPrompt();
        } else if(filterData === 'price') {
          this.showFilterPricePrompt();
        }

      }
    });
      // Filter popup will show
      alertFilter.present().then(() => {
      this.filterRadioOpen = true;
    });
  }

  // Method for running a Type alert
  showFilterType(){
    const confirmType = this.alertCtrl.create({
      title: "Type Filter",
      message: "Select the TYPE of the book that you want to filter.",
      buttons: [
      {
        // Advertisement Button with value = Advertisement
        text: "Advertisements",
          handler: data => {
            console.log('Advertisement clicked');
            // Value saved and send with the postFilterTypeBook method.
            this.postFilterTypeBook(this.adData);
      }
      },
      {
        // Request Button with value = Request
        text: 'Requests',
          handler: data => {
            console.log('Request clicked');
             // Value saved and send with the postFilterTypeBook method.
            this.postFilterTypeBook(this.reqData);
      }
      }
      ]
    });
    // Filter alert will show.
    confirmType.present();
  }

  // Method for running a Subject alert
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
          // Cancel button will close the alert
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          // Apply button will save the entered value and send with postFilterSubjectBook method
          text: 'Apply',
          handler: data => {
            console.log('Apply clicked');
            this.postFilterSubjectBook(data);
          }
        }
      ]
    });
    // Alert will show
    filterSprompt.present();
  }

  // Method for running a Price alert
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
          // Cancel button will close the alert
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          // Apply button will save the entered value and send with postFilterPriceBook method
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

  // Method to show Help alert
  showHelpAlert() {
    const helpAlert = this.alertCtrl.create({
      title: 'Help!',
      subTitle: `This is a list of all available books, you can filter book according Type, Subject and Code.`,
      buttons: ['OK']
    });
    helpAlert.present();
  }

  // POST method to filter the types of book list
  postFilterTypeBook(data) {
    console.log(data);
    // request send to web service
    this.submitService.postFilterTypeData(data)

    // Web page send the filterd booklist based on the type value
    .subscribe(response => {
      console.log(response);
//      typeFilterBooks : [response];
    },
      (error) => console.log('Problem accuired during type filter.'));
    } 
  
    // POST method to filter the subject of book list
  postFilterSubjectBook(data) {
    console.log(data);
    // request send to web service
    this.submitService.postFilterSubjectData(data)

    // Web page send the filterd booklist based on the subject value
    .subscribe(response => {
      console.log(response);
    },
      (error) => console.log('Problem accuired during subject filter.'));
    } 

  // POST method to filter the price of book list  
  postFilterPriceBook(data) {
    console.log(data);
    // request send to web service
    this.submitService.postFilterPriceData(data)

    // Web page send the filterd booklist based on the price value
    .subscribe(response => {
      console.log(response);
    },
      (error) => console.log('Problem accuired during price fiter.'));
    }

    // Get method to get list from the web service.
    getBookList(){
      //request send to web service.
      this.submitService.getBookListData()

      //Web service sends book list back to user.
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

