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
    public pageTitle: string = "Account Settings & Information";
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
    form: any;
    submitted: boolean = false;

    constructor(public af: AngularFire, public AngularFire: AngularFire, private _router: Router) {
        // console.log('>>>>>', this.af.auth);


        this.af.database.list('/users').subscribe((users) => {
            this.users = users;
        });


        this.af.auth.subscribe((auth) => {

            // console.log(auth, "called");
            if (auth == null || (auth == null && auth.uid == null)) {
                // console.log('logged out');
                this.authed = false;
                this.user = null;
                this.poop = 'LOGGED OUT';

                //console.log('User is not logged in!')
            }
            else {
                // console.log('logged in');
                this.authed = true;
                this.uid = auth.uid;
                if (this.users == null) {
                    this.af.database.list('/users').subscribe((users) => {

                        this.users = users;
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
        //this.users = this.af.database.list('/users');
        const filtered = this.users.filter(user => user.uid === auth.uid);
        this.user = this.af.database.object('/users/' + filtered[0].$key);
        this.address = this.af.database.object('/users/' + filtered[0].$key + '/address');
        // this.me = this.users[3].uid;
        // this.mike = this.users[4].uid;
        //this.username  = filtered[0].$key.name;
        //console.log('Here are the Admin uids -', this.mike, this.me);
        // console.log('user', this.user, filtered);
        this.email = filtered[0].email;
        // console.log(this.email)
        //console.log('User is logged in! - Here is their uid :', auth.uid);
    }

    resetPassword(email: string): Observable<void> {
        alert('Your Request has been sent')
        return Observable.fromPromise<void>(firebase.auth().sendPasswordResetEmail(this.email))



    }


    public loginWithGoogle() {
        // This will perform popup auth with google oauth and the scope will be email
        // Because those options were provided through bootstrap to DI, and we're overriding the provider.
        this.af.auth.login({
            provider: AuthProviders.Google
        })
    }

    public login(email: string, password: string) {
        // console.log(email, password);
        this.af.auth.login({
            email: email, password: password,
            provider: AuthProviders.Password
        }),
            this._router.navigate(['/'])




    }

    save(newName: string) {
        this.user.set({ name: newName });
    }
    // update(newName: string, newPhone: string, newProfilePic: string, newAddress: string, newCity: string, newState: string, newZip: string, email: string, uid: string) {
    //     if (newName || newPhone || newProfilePic || newAddress || newCity || newState || newZip === null) {
    //         this.user.set({ name: newName, phone: newPhone, profilepic: newProfilePic, email:this.email, uid:this.uid });
    //         // console.log(this.email, this.uid)
    //         this.address.set({ address: newAddress, city: newCity, state: newState, zip: newZip });
    //         alert('Thanks for adding to your profile')
    //         this._router.navigate(['/'])
    //     }
    //     else {
    //         this.user.update({ name: newName, phone: newPhone, profilepic: newProfilePic });
    //         this.address.update({ address: newAddress, city: newCity, state: newState, zip: newZip });
    //         alert('Thanks for updating your profile')
    //         this._router.navigate(['/'])
    //     }
    // }

    updateName(newName: string) {
        this.user.update({ name: newName });
        alert('Thanks for updating your profile')
        
    
    }
    updatePhone(newPhone: string) {
        this.user.update({ phone: newPhone })
    }

    updateAddress(newAddress: string) {
        this.address.update({ address: newAddress })
    }

    updateCity(newCity: string) {
        this.address.update({ city: newCity })
    }

    updateZip(newZip: string) {
        this.address.update({ zip: newZip })
    }

    updateState(newState: string) {
        this.address.update({ state: newState })
    }

    //  updatePassword(newPassword: string) {
    //      this.user.set({ password: newPassword })
    //  }


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




