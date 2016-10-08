import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods, AngularFireAuth } from 'angularfire2';
import {FirebaseAuth} from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import {Router} from '@angular/router';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var firebase: any;
import { UserEmail } from './user.email.interface';

@Component({
    templateUrl: 'app/login/forgot.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})

export class ForgotComponent {

    firebaseAuth: AngularFireAuth;
    user: FirebaseObjectObservable<any>;
    address: FirebaseObjectObservable<any>;
    email: string;
    me: string;
    form: any;
    submitted: boolean = false;

    constructor(public af: AngularFire,
        public AngularFire: AngularFire,
        private router: Router
    ) {
        this.firebaseAuth = AngularFire.auth;
     
    }

    resetPassword(email: string): Observable<void> {
        return Observable.fromPromise<void>(firebase.auth().sendPasswordResetEmail(email))
        
          
    }

   

  onSubmit(form: any)  {
    this.submitted = true;
    this.form = form;
          this.router.navigate(['/']),
          alert("Request has been sent.");
          
  }

 
    public logout() {
        this.af.auth.logout()
    }
    public loggedIn() {
        if (!this.af.auth.subscribe) {

            alert("You are not logged in!")
        }
    }


}