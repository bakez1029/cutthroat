import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { ProductService } from './product.service';
import { CartService } from './cart.service';
import { IProduct } from './product';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuth, AuthProviders } from 'angularfire2';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
declare var Stripe: any;

@Component({
    templateUrl: 'app/products/payment.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class PaymentComponent implements OnInit {
    pageTitle: string = 'Payment & Billing Information';
    products: IProduct[];
    private cartItems: IProduct[] = [];
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
    cardCity: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
    private cardToken: any;
    message: string;


    constructor(
        private route: ActivatedRoute,
        private _router: Router,
        private _productService: ProductService,
        private cartService: CartService,
        private activatedRoute: ActivatedRoute,
        public af: AngularFire) {

        // this.pageTitle += `: ${id}`;

 this.cartItems = cartService.getCart();
        console.log(this.cartItems)



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


    setUpCard() {
        //here we setup the stripe publish key.
        //notice that this is a test key for my account so replace with production key(live)
        Stripe.setPublishableKey('pk_test_g28TckkfT61O55rHUCgH7aDO');
    }

    getCardData(number, month, year, cvc, city) {
        //I get the card data typed in here and pass it to the getCardToken method
        this.getCardToken(number, month, year, cvc, city);
    }

    getCardToken(number, month, year, cvc, city) {
        //set up the card data as an object
        var dataObj = { "number": number, "exp_month": month, "exp_year": year, "cvc": cvc, "city": city };

        // Request a token from Stripe:
        Stripe.card.createToken(dataObj,
            (status, response) => { //I'm using an arrow function instead of stripeResponseHandler(a function also) cos it's kickass!
                // basically you can do anything here with the reponse that has your token
                // you can hit your backend api and initialize a charge etc
                if (status === 200) {
                    console.log("the card response: ", response);
                    this.cardToken = response.id;
                    console.log("the card token: ", this.cardToken, city);
                    alert("A confirmation has been sent to your e-mail.")
                    this._router.navigate(['/'])
                }
                else {
                    console.log("error in getting card data: ", response.error)
                }
            }
        );

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

        this.setUpCard();
    }

    onBack(): void {
        this._router.navigate(['/cart']);
    }
    // onBuy(): void {
    //     this._router.navigate(['/cart']);
    // }

    mustAuth(): void {
        alert("You must be logged in purchase an item.")
        this._router.navigate(['/login']);
    }
}

