import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ProductService } from './product.service';
import { CartService } from './cart.service';
import { IProduct } from './product';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuth, AuthProviders } from 'angularfire2';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
declare var Stripe: any;

@Component({
    templateUrl: 'app/products/product-detail.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES]
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
    uid: string;
    authed: boolean = true;
    poop: string;
    users: any;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
    private cardToken: any;
    message: string;
    cart: FirebaseObjectObservable<any>;
    items: FirebaseObjectObservable<any>;
    basket = [0]


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _productService: ProductService,
        private cartService: CartService,
        private activatedRoute: ActivatedRoute,
        public af: AngularFire) {

        // this.pageTitle += `: ${id}`;


        this.af.database.list('/users').subscribe((users) => {
            this.users = users;
        });

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

    addToCart() {
        this.cartService.addProduct(this.product);
        console.log(this.cartService.getTotalPrice())
    }

    setUpCard() {
        //here we setup the stripe publish key.
        //notice that this is a test key for my account so replace with production key(live)
        Stripe.setPublishableKey('pk_test_g28TckkfT61O55rHUCgH7aDO');
    }

    getCardData(number, month, year, cvc) {
        //I get the card data typed in here and pass it to the getCardToken method
        this.getCardToken(number, month, year, cvc);
    }

    getCardToken(number, month, year, cvc) {
        //set up the card data as an object
        var dataObj = { "number": number, "exp_month": month, "exp_year": year, "cvc": cvc };

        // Request a token from Stripe:
        Stripe.card.createToken(dataObj,
            (status, response) => { //I'm using an arrow function instead of stripeResponseHandler(a function also) cos it's kickass!
                // basically you can do anything here with the reponse that has your token
                // you can hit your backend api and initialize a charge etc
                if (status === 200) {
                    console.log("the card response: ", response);
                    this.cardToken = response.id;
                    console.log("the card token: ", this.cardToken);
                }
                else {
                    console.log("error in getting card data: ", response.error)
                }
            }
        );

    }

    setUsers(auth: any) {

        const filtered = this.users.filter(user => user.uid === auth.uid);
        this.user = this.af.database.object('/users/' + filtered[0].$key);
        this.cart = this.af.database.object('/users/' + filtered[0].$key + '/cart');
        this.items = this.af.database.object('/users/' + filtered[0].$key + '/cart/items');

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
        this.setUpCard();
    }

    onBack(): void {
        this.router.navigate(['/products']);
    }
    // onBuy(): void {
    //     this._router.navigate(['/cart']);
    // }

    mustAuth(): void {
        alert("You must be logged in purchase an item.")
        this.router.navigate(['/login']);
    }

    // cartPurchase() {
    //     var basket= [this.productId]
    //     for (var i = 0; i < basket.length; i++) {
    //        var item = this.items[i];
    //         this.cart.set({item: this.items});
    //         alert("Item added to cart");
    //         this.router.navigate(['/products'])
    //         }
      
    



    }

