import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods } from 'angularfire2';
import {FirebaseAuth} from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import {Router} from '@angular/router';


@Component({
    templateUrl: 'app/login/cart.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})

export class CartComponent {
    title = 'Firebase Testing';
    email: string;
    password: string;
    items: FirebaseListObservable<any>;

    constructor(public af: AngularFire,
        private _auth: FirebaseAuth,
        private _router: Router
    ) {
        this.items = af.database.list('/users');
        this.email,
            this.password

    }

    public loginWithGoogle() {
        // This will perform popup auth with google oauth and the scope will be email
        // Because those options were provided through bootstrap to DI, and we're overriding the provider.
        this._auth.login({
            provider: AuthProviders.Google
        })
    }

    public login(email: string, password: string) {
        console.log(email, password);
        this._auth.login({
            email: email, password: password,
            provider: AuthProviders.Password
        }),
            this._router.navigate(['/'])
            



    }


    //   registerUser(email: string, password: string, cpassword: string) {
    //     console.log(email, password, cpassword)
    //     if (password === cpassword) {
    //        this._auth.createUser({email: email, password: password}) 

    //     }
    //     else {
    //       console.log("Invalid passwords");
    //     }

    //   }
    public logout() {
        this._auth.logout()
    }
    public loggedIn() {
        if (!this.af.auth.subscribe) {

            alert("You are not logged in!")
        }
    }


    // update(key: string, newSize: string) {
    //   this.items.update(key, { size: newSize });
    // }

    // deleteItem(key: string) {
    //   this.items.remove(key);
    // }
    // deleteEverything() {
    //   this.items.remove();
    // }


}