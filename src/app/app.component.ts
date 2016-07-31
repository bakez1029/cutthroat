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
import { ArtistsComponent } from './artists/artists.component';
import { JobsComponent } from './jobs/jobs.component';
import { PhotosComponent } from './photos/photos.component';
import { TestComponent } from './test/test.component';
import { ProductListComponent } from './products/product-list.component';
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
    path: 'artists',
    component: ArtistsComponent
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
    path: 'testimonials',
    component: TestComponent
  },
  {
    path: 'products',
    component: ProductListComponent
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
  user: FirebaseObjectObservable<any>;
  address: FirebaseObjectObservable<any>;
  uid: string;
  authed: boolean = true;
  me: string;
  mike: string;
  name: string;
  email: string;
  profilepic: string;
  poop: string = 'poop';

  constructor(public af: AngularFire, private router: Router, private appService: AppService) {
   
    this.user = appService.user;
    console.log('user [', this.user, ']');


      this.poop = 'xxxxxxxxxxxx';

    setTimeout(function() {
      //this.user = this.appService.user;
      //this.user = 'poopy';
      console.log('xxx');
      this.poop = 'yyyyyyyyyy';
    }, 2000);    
    
//     this.af.auth.subscribe((auth) => {
//   this.af.database.list('/users').subscribe((_users) => {
//     const filtered = _users.filter(user => user.uid == auth.uid);
//     var checkUser = filtered[0];
//     var name, email, profilepic, uid;

// if (checkUser != null) {
//   name = checkUser.name;
//   email = checkUser.email;
//   profilepic = checkUser.profilepic;
//   uid = checkUser.uid
//   console.log('Found a User!', checkUser.name, checkUser.email, checkUser.profilepic, checkUser.uid)
//   }
//   else {

//       this.router.navigate(['/']);
//   }
//   })
    
//   })
  }

getUsers() {
    this.appService.getUsers();
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


