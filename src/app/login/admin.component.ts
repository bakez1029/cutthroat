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

@Component({
    templateUrl: 'app/login/admin.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})

export class AdminComponent {
user: FirebaseObjectObservable<any>;
    address: FirebaseObjectObservable<any>;
    form:FirebaseObjectObservable<any>;

    constructor(public af: AngularFire,
        private router: Router
    ) {
      
this.af.database.list('/forms').subscribe((_forms) => {
    console.log(_forms[0].ApplicantInfo)
    this.form = this.af.database.object('/forms/' + _forms[1].$key.ApplicantInfo)
        console.log(this.form)
  
})

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