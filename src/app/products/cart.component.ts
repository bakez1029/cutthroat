import { Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { FirebaseAuth } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute} from '@angular/router';
import { FORM_DIRECTIVES } from "@angular/common";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { CartService } from "./cart.service";
import { ItemPreviewComponent } from "./item-preview.component";
import { DefaultCheckout } from "./checkout.service";
// import {paymentMethods} from "./Mock/payment-methods.mock.json";
import { ICheckoutType } from "./checkout.service";

@Component({
    templateUrl: 'app/products/cart.component.html',
    directives: [ROUTER_DIRECTIVES, ItemPreviewComponent, FORM_DIRECTIVES],
    providers: [HTTP_PROVIDERS, DefaultCheckout]
})

export class CartComponent {
    pageTitle: string = 'Cart';
    private cartItems: IProduct[] = [];
    private paymentOutput: string = "";
    email: string;
    password: string;
    items: FirebaseListObservable<any>;
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

    constructor(public af: AngularFire,
        private _auth: FirebaseAuth,
        private _router: Router,
        private cartService: CartService,
        private productService: ProductService,
        private route: ActivatedRoute,
        private defaultCheckout: DefaultCheckout
    ) {
        this.cartItems = cartService.getCart();
        console.log(this.cartItems, "CART ITEMS")

    }
    // setPaymentType(type:string){
    //     this.defaultCheckout.checkOutType = paymentMethods.filter(paymentMethod=>paymentMethod.name.toLowerCase()===type.toLowerCase())[0];
    // }
    // setDiscount(name:string){
    //     this.cartService.applyDiscount(name);
    // }
    pay() {
        this.paymentOutput = this.defaultCheckout.checkOut(this.cartService.getTotalPrice());
    }

    public login(email: string, password: string) {
        this._auth.login({
            email: email, password: password,
            provider: AuthProviders.Password
        }),
            this._router.navigate(['/'])

    }

    ngOnInit() {
           
    }

    onPay(): void {
        this._router.navigate(['/payment']);
    }

}