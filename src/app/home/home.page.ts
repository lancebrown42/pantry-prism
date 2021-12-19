import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: User = new User();
  loggedIn = Boolean(sessionStorage.getItem('user'));
  constructor() { }

  ngOnInit() {
    // console.log(this.loggedIn);
    this.loggedIn = Boolean(sessionStorage.getItem('user'));
    // window.location.reload();
  }
  ionViewWillEnter(){
    this.loggedIn = Boolean(sessionStorage.getItem('user'));
    this.user = JSON.parse(sessionStorage.getItem('user'));

  }
  ionViewDidEnter(){
    this.loggedIn = Boolean(sessionStorage.getItem('user'));
    console.log('viewWillEnter');
    console.log(this.loggedIn);
  }
  ionViewWillLeave(){
    console.log('willleave');
  }
  logout(){
    console.log('LOGOUT');
    sessionStorage.removeItem('user');
    // console.log(sessionStorage.getItem('user'));
    this.loggedIn = false;
  }

}
