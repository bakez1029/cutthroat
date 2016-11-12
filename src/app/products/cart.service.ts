import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { DefaultCheckout, IDiscount } from "./checkout.service";
// import {discounts} from "../Mock/discounts.mock.json";

@Injectable()
export class CartService {

    private cart: IProduct[] = [];
    private discount: IDiscount;
    noCartItems: string = "";
    imageUrl: string;



    addProduct(product: IProduct) {
        this.cart.push(product);
    }
    deleteProduct(product: IProduct) {
        this.cart = this.cart.filter(cart => cart.productId == product.productId);
 
    }
    clearCart() {
        this.cart = [];
    }
    // applyDiscount(code:string){
    //     this.discount = discounts.filter(discount=>discount.code==code)[0];
    // }
    getCart(): IProduct[] {

        if (this.cart === []) {

            this.noCartItems = "<h2>You have no items in your cart</h2>";

        }
        else {
            return this.cart;
        }

      

    }
    getTotalPrice() {
        let totalPrice = this.cart.reduce((sum, cartItem) => {
            return sum += cartItem.price, sum;
        }, 0);
        if (this.discount) {
            totalPrice -= totalPrice = this.discount.amount;
        }
        return totalPrice;
    }
}