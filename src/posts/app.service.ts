import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SubmitService {

  constructor(private httpclient: HttpClient) {
  }

  postloginData(value) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.post('http://192.168.8.103:3000/student/login', value);
  }

  postBookData(value) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.post('http://192.168.8.103:3000/book/addbook', value, {headers:header});
  }

  postDeleteBookData(value) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.post('http://192.168.8.103:3000/book/myBook/delete', value, {headers:header});
  }

  getMyBookData() {
    return this.httpclient.get('http://192.168.8.103:3000/book/myBook');
  }

  getBookListData() {
    return this.httpclient.get('http://192.168.8.103:3000/book/getBook');
  }

  postFilterTypeData(value) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.post('http://192.168.8.103:3000/book/type', value, {headers:header});
  }

  postFilterSubjectData(value) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.post('http://192.168.8.103:3000/book/subject', value, {headers:header})
  }

  postFilterPriceData(value) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpclient.post('http://192.168.8.103:3000/book/price', value, {headers:header})
  }

  getToken() {
    return sessionStorage.getItem('data');
  }
}
