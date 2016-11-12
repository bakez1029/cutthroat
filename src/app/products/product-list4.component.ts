import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Router } from '@angular/router';
import { IProduct } from './product'
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuth, AuthProviders} from 'angularfire2';
import { ProductFilterPipe } from './product-filter.pipe';
// import { StarComponent } from '../shared/star.component';
import { ProductService } from './product.service';
import { PFilterPipe4 } from './pfilter4.pipe';

@Component({
    templateUrl: 'app/products/product-list4.component.html',
    pipes: [ProductFilterPipe, PFilterPipe4],
    directives: [ROUTER_DIRECTIVES],
})
export class ProductList4Component implements OnInit {
    pageTitle: string = 'Product List Page 4';
    imageWidth: number = 200;
    imageHeight: number = 200;
    imageMargin: number = 2;
    showImage: boolean = true;
    listFilter: string;
    errorMessage: string;
    products: IProduct[];
    user: any; // FirebaseObjectObservable<any>;
    uid: string;
    authed: boolean = true;
    me: string;
    address: FirebaseObjectObservable<any>;
    mike: string;
    name: string;
    email: string;
    profilepic: string;
    poop: string;
    username: string;
    users: any;
    cart: FirebaseObjectObservable<any>;

    constructor(private productService: ProductService,
        private router: Router, public af: AngularFire) {

   this.af.auth.subscribe((auth) => {

            //console.log(auth, "called");
            if (auth == null || (auth == null && auth.uid == null)) {
                //console.log('logged out');
                this.authed = false;
                this.user = null;
                this.poop = 'LOGGED OUT';

                console.log('User is not logged in!')
            }
            else {
                console.log('logged in');
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


    }


    ngOnInit() {
        this.productService.getProducts()
            .subscribe(products => this.products = products,
            error => this.errorMessage = <any>error);
            console.log(this.products, "RIGHT HERE")
       
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }



    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }


}