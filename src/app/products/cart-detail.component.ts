import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from './product'
// import { StarComponent } from '../shared/star.component';
import { ProductService } from './product.service';

@Component({
    templateUrl: 'app/products/cart-detail.component.html',
    directives: [ROUTER_DIRECTIVES],
})
export class CartDetailComponent implements OnInit {
    pageTitle: string = 'Cart Detail';
    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;
    products: IProduct[];
    productName: string = '';
    productBrand: string = '';
    product: IProduct;
    cartId: number = 0;
    productPrice: number = 0;
    releaseDate: string = '';
    description: string = '';
    imageUrl: string = '';
    paramsSub: any;

    constructor(private productService: ProductService,
        private router: Router, private activatedRoute: ActivatedRoute) {



    }


    ngOnInit() {

        this.paramsSub = this.activatedRoute.params.subscribe(params => {
            this.cartId = parseInt(params['id'], 10);
            console.log('cartid', this.cartId);
        });

        this.productService.getProducts()
            .subscribe(
            products => {
                this.products = products
                this.cartId = this.cartId[this.cartId];
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
}