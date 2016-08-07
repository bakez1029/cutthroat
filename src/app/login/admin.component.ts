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

    firebaseAuth: AngularFireAuth;
    user: any; // FirebaseObjectObservable<any>;
    address: FirebaseObjectObservable<any>;
    uid: string;
    authed: boolean = true;
    me: string;
    mike: string;
    name: string;
    email: string;
    profilepic: string;
    poop: string;
    username: string;
    users: any;
    submitted: boolean = false; 
    forms: any;
    form: FirebaseObjectObservable<any>;
    form2: FirebaseObjectObservable<any>;

    constructor(public af: AngularFire, public AngularFire: AngularFire, private _router: Router) {


        this.af.database.list('/forms').subscribe((forms) => {
            this.forms = forms;
        });


        this.af.auth.subscribe((auth) => {

            console.log(auth, "called");
            if (auth == null || (auth == null && auth.uid == null)) {
                console.log('logged out');
                this.authed = false;
                this.user = null;
                this.poop = 'LOGGED OUT';

                //console.log('User is not logged in!')
            }
            else {
                console.log('logged in');
                this.authed = true;
                this.uid = auth.uid;
                if (this.forms == null) {
                    this.af.database.list('/forms').subscribe((forms) => {
                        this.forms= forms;
                        this.setUsers(auth);
                    });
                }
                else {
                    this.setUsers(auth);
                }
            }
        });
    }

    setUsers(auth: any) {
    this.form = this.af.database.object('/forms/' + this.forms[0].$key + '/ApplicantInfo')
    this.form2 = this.af.database.object('/forms/' + this.forms[1].$key + '/ApplicantInfo')
       



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

