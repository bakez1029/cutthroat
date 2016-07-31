import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods, AngularFireAuth } from 'angularfire2';
import {FirebaseAuth} from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {defaultFirebase} from 'angularfire2';
declare var firebase: any;

@Component({
    templateUrl: 'app/login/settings.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})

export class SettingsComponent {
  firebaseAuth: AngularFireAuth;
    user: FirebaseObjectObservable<any>;
    address: FirebaseObjectObservable<any>;
    email: string;
    me: string;
    form: any;
    submitted: boolean = false;
    constructor(public af: AngularFire, public AngularFire: AngularFire, private _router: Router) {
        this.firebaseAuth = AngularFire.auth;
          this.af.auth.subscribe((auth) => {

      if (auth === null) {
        console.log('User is not logged in!')
      }
      else if (this.user == undefined) {
        console.log('User is logged in!')
        this.af.database.list('/users').subscribe((_users) => {
          const filtered = _users.filter(user => user.uid === auth.uid)
          this.user = this.af.database.object('/users/' + filtered[0].$key)
          console.log(this.user)
          this.address = this.af.database.object('/users/' + filtered[0].$key + '/address')
        

        })
      }
    })
  }

resetPassword(email: string): Observable<void> {
        return Observable.fromPromise<void>(firebase.auth().sendPasswordResetEmail(email))
        
          
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
        }),
            this._router.navigate(['/'])




    }

    save(newName: string) {
        this.user.set({ name: newName });
    }
    update(newName: string, newPhone: string, newProfilePic: string, newAddress: string, newCity: string, newState: string, newZip: string) {
        if (newName || newPhone || newProfilePic || newAddress || newCity || newState || newZip === null) {
            this.user.set({ name: newName, phone: newPhone, profilepic: newProfilePic });
            this.address.set({ address: newAddress, city: newCity, state: newState, zip: newZip });
            alert('Thanks for adding to your profile')
            this._router.navigate(['/'])
        }
        else {
            this.user.update({ name: newName, phone: newPhone, profilepic: newProfilePic });
            this.address.update({ address: newAddress, city: newCity, state: newState, zip: newZip });
            alert('Thanks for updating your profile')
            this._router.navigate(['/'])
        }
    }
    delete() {
        this.user.remove();
    }

    public logout() {
        this.af.auth.logout()
    }
    public loggedIn() {
        if (!this.af.auth.subscribe) {

            alert("You are not logged in!")
        }
    }

// update(newName: string, newPhone: string, newProfilePic: string, newAddress: string, newCity: string, newState: string, newZip: string) {
//         if (newName || newPhone || newProfilePic || newAddress || newCity || newState || newZip === null) {
//             this.user.set({ name: newName, phone: newPhone, profilepic: newProfilePic });
//             this.address.set({ address: newAddress, city: newCity, state: newState, zip: newZip });
//             alert('Thanks for adding to your profile')
//             this._router.navigate(['/'])
//         }
//         else {
//             this.user.update({ name: newName, phone: newPhone, profilepic: newProfilePic });
//             this.address.update({ address: newAddress, city: newCity, state: newState, zip: newZip });
//             alert('Thanks for updating your profile')
//             this._router.navigate(['/'])
//         }
//     }
}




