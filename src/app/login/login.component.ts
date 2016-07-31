import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods, AngularFireAuth } from 'angularfire2';
import {FirebaseAuth} from 'angularfire2';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {Router} from '@angular/router';
declare var firebase: any;



@Component({
  templateUrl: 'app/login/login.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS]
})

export class LoginComponent {

  user: FirebaseObjectObservable<any>;
  address: FirebaseObjectObservable<any>;
  uid: string;
  authed: boolean = false;
  me: string;
  mike: string;
  name: string;
  email: string;
  profilepic: string;

  constructor(public af: AngularFire, public AngularFire: AngularFire, private router: Router) {
  }

  public loginWithGoogle() {
    // This will perform popup auth with google oauth and the scope will be email
    // Because those options were provided through bootstrap to DI, and we're overriding the provider.
    this.af.auth.login({
      provider: AuthProviders.Google
    })
  }

  public login(email: string, password: string) {
    console.log(email, password);
    this.af.auth.login({
      email: email, password: password,
      provider: AuthProviders.Password
    })

    this.router.navigate(['/']);


  }



  public logout() {
    this.af.auth.logout();
    this.router.navigate(['/'])


  }

  slogout() {
    if (this.af.auth.logout = null) {
      return "You are Logged Out!";
    }
    else {
      return "You are Logged In!";
    }

  }

}