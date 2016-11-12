import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from "./product";
import { CartService } from "./cart.service";
import { ProductService } from "./product.service";

@Component({
    selector: 'item-preview',
    styles: [`
        .row img{
            width:120px;
            height:120px;
        }
        .row b{
            cursor:pointer;
        }
    `],
    template: `
        <div class="row">
            <div class="col-md-4"><img src={{image}}/></div>
            <br>
            <br>
            <div class="col-md-4"><b (click)="ViewDetails()">{{name}} by {{brand}}</b>
               
            </div>
      
            <div class="col-md-4">
            <center>
               $ {{price}}.00 &nbsp;&nbsp;
                <button (click)="deleteProduct()">Remove</button>
                </center>
            </div>
        </div>
    `
})

export class ItemPreviewComponent implements OnInit {
    image: string = '';
    desc: string = '';
    price: number = 0;
    brand: string = '';
    name: string = '';
    private cart: IProduct[] = [];
    paramsSub: any;
    productId: number = 0;
    cartId : number = 0;


    @Input() carts: IProduct;


    constructor(private router: Router, private route: ActivatedRoute, private cartService: CartService, private productService: ProductService) {

    }
    // ViewDetails(){
    //     this.router.navigate( ['Details', { id: this.item.id }] )
    // }
    addToCart() {
        this.cartService.addProduct(this.carts);
        console.log(this.cartService.getTotalPrice())
    }

    deleteProduct(product: IProduct) {
        this.cartService.deleteProduct(this.carts);

    }

    ngOnInit() {


        this.cart = this.cartService.getCart(); // GET CART 
        // this.cartId = this.cart[0].productId; // GET IDS
       
for ( var i = 0; i < this.cart.length; i++) { //get all the form data
        console.log(this.cart[i], "x")

        this.image = this.cart[i].imageUrl
        console.log(this.image, "HI")
         this.desc = this.cart[i].description;
         this.price = this.cart[i].price;
         this.brand = this.cart[i].productBrand;
         this.name = this.cart[i].productName;


    }
}
}