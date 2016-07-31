import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, firebaseAuthConfig, AuthProviders, AuthMethods} from 'angularfire2';
import { appRouterProviders } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,
  appRouterProviders,
  defaultFirebase({
    apiKey: "AIzaSyCnEW-TiTxpDbiaoyEx-EtfNDH3W8p5prc",
    authDomain: "project-3685012128358143188.firebaseapp.com",
    databaseURL: "https://project-3685012128358143188.firebaseio.com",
    storageBucket: "project-3685012128358143188.appspot.com",
  }),
    firebaseAuthConfig({
     provider: AuthProviders.Password,
     method: AuthMethods.Password,
    })
]);

