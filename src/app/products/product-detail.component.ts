import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { IProduct } from './product';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuth, AuthProviders} from 'angularfire2';

@Component({
    templateUrl: 'app/products/product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Info';
    products: IProduct[];
    errorMessage: string;
    productName: string = '';
    productBrand: string = '';
    product: IProduct;
    productId: number = 0;
    productPrice: number = 0;
    releaseDate: string = '';
    description: string = '';
    imageUrl: string = '';
    paramsSub: any;
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


    constructor(
        private route: ActivatedRoute,
        private _router: Router,
        private _productService: ProductService,
        private activatedRoute: ActivatedRoute,
        public af: AngularFire) {

        // this.pageTitle += `: ${id}`;


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
        // this.user = this.af.database.object('/users/' + filtered[0].$key);
        // this.address = this.af.database.object('/users/' + filtered[0].$key + '/address');
        // this.me = this.users[6].uid;
        // this.mike = this.users[5].uid;
        //this.username  = filtered[0].$key.name;
        //console.log('Here are the Admin uids -', this.mike, this.me);
        //console.log('user', this.user, filtered);
        //console.log('User is logged in! - Here is their uid :', auth.uid);

    }

    ngOnInit() {

        this.paramsSub = this.activatedRoute.params.subscribe(params => {
            this.productId = parseInt(params['id'], 10);
            console.log('productid', this.productId);
        });

        this._productService.getProducts()
            .subscribe(
            products => {
                this.products = products
                this.product = this.products[this.productId];
                console.log(this.product)
                this.productName = this.product.productName;
                this.productBrand = this.product.productBrand;
                this.productPrice = this.product.price;
                this.releaseDate = this.product.releaseDate;
                this.description = this.product.description;
                this.imageUrl = this.product.imageUrl;
            },

            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this._router.navigate(['/products']);
    }
    onBuy(): void {
        this._router.navigate(['/cart']);
    }

    mustAuth(): void {
        alert("You must be logged in purchase an item.")
        this._router.navigate(['/login']);
    }
}

