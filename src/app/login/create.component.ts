import { Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods, FirebaseAuthState, firebaseAuthConfig, AngularFireAuth } from 'angularfire2';
import {FirebaseAuth} from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import {FirebaseRef} from 'angularfire2';
import {Inject} from '@angular/core';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {FirebaseUrl, FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';
declare var firebase: any;


@Component({
  templateUrl: 'app/login/create.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS]
})

@Injectable()
export class CreateComponent {
  title = 'Create User';
  users: FirebaseListObservable<any>;
  item: FirebaseObjectObservable<any>;
  email: 'bakez1029@gmail.com';

  constructor(
    public af: AngularFire,
    private router: Router) {


    this.users = af.database.list('/users');
    this.af.auth.subscribe(auth => (auth));


  }
  registerUser(email: string, password: string, cpassword: string) {
    // console.log(email, password, cpassword)
    if (password === cpassword && email.trim() != '') {
      this.af.auth.createUser({ email: email, password: password }).then((auth) => {
        this.af.auth.login({ email: email, password: password, provider: AuthProviders.Password }).then((loginData) =>
          // console.log(loginData),
          this.users.push({ email: email, password: password, uid: auth.uid, name: "User", profilepic: "http://www.homestyler.com/resource/images/en_US/userprofile/default-user-image.png"})),
          this.router.navigate(['/']);

      });
    }
    else {
      console.log("Invalid passwords");
      alert("Passwords did not match.")
    }
  }




}
