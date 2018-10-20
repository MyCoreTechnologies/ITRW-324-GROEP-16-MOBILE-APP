import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SubmitService {
// All POSTS to web service is in JSON format
  constructor(private httpclient: HttpClient) {
  }

  // Creating Post method for login
  // Data send to web service: Student_Number
  //                           Password
  // Data received from web service: Token
  // URL : http://18.206.247.140:3000/student/login
  postloginData(value) {
    return this.httpclient.post('http://18.206.247.140:3000/student/login', value);
  }

  // Creating Post method for AddBook Data entered in addbook.html
  // Data send to web service: Token inserted by interceptor
  //                           Book details
  // Data received from web service: Validation
  // URL : http://18.206.247.140:3000/book/addbook
  postBookData(value) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.post('http://18.206.247.140:3000/book/addbook', value, {headers:header});
  }

  // Creating Post method for Deletebook Data
  // Data send to web service: Token inserted by interceptor
  //                           Book Number
  // Data received from web service: Validation
  // URL : http://18.206.247.140:3000/book/myBook/delete
  postDeleteBookData(value) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.post('http://18.206.247.140:3000/book/myBook/delete', value, {headers:header});
  }

  // Creating Get method for MyBook Data
  // Data send to web service: Token inserted by interceptor
  // Data received from web service: mybook Book details
  // URL : http://18.206.247.140:3000/book/myBook
  getMyBookData() {
    return this.httpclient.get('http://18.206.247.140:3000/book/myBook');
  }

  // Creating Get method for BookList Data
  // Data send to web service: Token inserted by interceptor
  // Data received from web service: All Book details
  // URL : http://18.206.247.140:3000/book/getBook
  getBookListData() {
    return this.httpclient.get('http://18.206.247.140:3000/book/getBook');
  }

  // Creating Post method for BookList with Filter Book Type Data
  // Data send to web service: Token inserted by interceptor
  //                           Book Type
  // Data received from web service: Books Filtered by type
  // URL : http://18.206.247.140:3000/book/type
  postFilterTypeData(value) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.post('http://18.206.247.140:3000/book/type', value, {headers:header});
  }

  // Creating Post method for BookList with Filter Book subject Data
  // Data send to web service: Token inserted by interceptor
  //                           Book subject
  // Data received from web service: Books Filtered by subject
  // URL : http://18.206.247.140:3000/book/subject'
  postFilterSubjectData(value) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.post('http://18.206.247.140:3000/book/subject', value, {headers:header})
  }

  // Creating Post method for BookList with Filter Book Price Data
  // Data send to web service: Token inserted by interceptor
  //                           Book Price
  // Data received from web service: Books Filtered by price
  // URL : http://18.206.247.140:3000/book/price
  postFilterPriceData(value) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.post('http://18.206.247.140:3000/book/price', value, {headers:header})
  }

  // GetToken method is used by the interceptor to the the token from the session storage.
  getToken() {
    return sessionStorage.getItem('data');
  }
}
