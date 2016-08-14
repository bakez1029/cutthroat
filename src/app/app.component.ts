import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuth, AuthProviders} from 'angularfire2';
import {provideRouter, RouterConfig, Router} from '@angular/router';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import { WelcomeComponent } from './home/welcome.component';
import { AdminComponent } from './login/admin.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './login/create.component';
import { SettingsComponent } from './login/settings.component';
import { CartComponent } from './login/cart.component';
import { ForgotComponent } from './login/forgot.component';
import { BarbersComponent } from './barbers/barbers.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contacts.component';
import { JobsComponent } from './jobs/jobs.component';
import { PhotosComponent } from './photos/photos.component';
import { ReviewComponent } from './reviews/review.component';
import { ProductListComponent } from './products/product-list.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { ProductService } from './products/product.service';
import { AppService } from './app.service';

const routes: RouterConfig = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'forgot',
    component: ForgotComponent
  },
  {
    path: 'barbers',
    component: BarbersComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
  {
    path: 'photos',
    component: PhotosComponent
  },
  {
    path: 'reviews',
    component: ReviewComponent
  },
  {
    path: 'products',
    component: ProductListComponent
    // children: [
    //   { path: '', component: ProductListComponent },
    //   { path: 'item/:id', component: ProductDetailComponent },
    // ]
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  },

];

export const appRouterProviders = [
  provideRouter(routes)
];

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, ProductService, AppService]
})

export class AppComponent implements OnInit {
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
  title: 'Cutthroat'
  constructor(public af: AngularFire, private router: Router, private appService: AppService) {
   
    // this.user = appService.user;
    // console.log('user [', this.user, ']');



    // setTimeout(() => {
    //   this.user = this.appService.user;
    //   console.log('user', this.user);
    // }, 2000);




    this.af.auth.subscribe((auth) => {

      //console.log(auth, "called");
      if (auth == null || (auth == null && auth.uid == null)) {
        //console.log('logged out');
        this.authed = false;
        this.user = null;
        this.poop = 'LOGGED OUT';

        //console.log('User is not logged in!')
      }
      else {
        //console.log('logged in');
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
    this.me = this.users[3].uid;
    this.mike = this.users[4].uid;
    //this.username  = filtered[0].$key.name;
    //console.log('Here are the Admin uids -', this.mike, this.me);
    //console.log('user', this.user, filtered);
    //console.log('User is logged in! - Here is their uid :', auth.uid);
  }

  getUsers() {
    //this.appService.getUsers();
  }
  ngOnInit() {
    //this.getUsers();

  }

  onClick(): void {
    this.router.navigate(['/create']);

  }

  logout() {
    this.af.auth.logout()
    this.router.navigate(['/'])
    this.authed = false;
  }

}


