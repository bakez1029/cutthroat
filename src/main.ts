import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
//import {ROUTER_PROVIDERS} from 'angular2/router';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyBbIOViJ7XVwF61kTUC-A6IggYMhaBH9Kg",
    authDomain: "jefftestproject-4f82d.firebaseapp.com",
    databaseURL: "https://jefftestproject-4f82d.firebaseio.com",
    storageBucket: "jefftestproject-4f82d.appspot.com",
  })
]);

