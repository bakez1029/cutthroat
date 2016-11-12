import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Router } from '@angular/router';
import { IProduct } from './product'
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuth, AuthProviders} from 'angularfire2';
import { ProductFilterPipe } from './product-filter.pipe';
// import { StarComponent } from '../shared/star.component';
import { ProductService } from './product.service';
import { PFilterPipe } from './pfilter1.pipe';

@Component({
    templateUrl: 'app/products/product-list.component.html',
    pipes: [ProductFilterPipe, PFilterPipe],
    directives: [ROUTER_DIRECTIVES],
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
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
    product: IProduct;
    productId: number = 0;
    items: FirebaseObjectObservable<any>;

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

        const filtered = this.users.filter(user => user.uid === auth.uid);
        this.user = this.af.database.object('/users/' + filtered[0].$key);
        this.cart = this.af.database.object('/users/' + filtered[0].$key + '/cart');
        this.items = this.af.database.object('/users/' + filtered[0].$key + '/cart/items');

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

 cartPurchase() {
       this.productService.getProducts()
            .subscribe(products => this.products = products);
            console.log(this.productId)
            this.cart.set({id: this.productId, quantity: 1});
            alert("Item added to cart");
            this.router.navigate(['/products'])

        }

}