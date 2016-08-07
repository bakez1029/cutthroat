import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { IProduct } from './product';

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

    constructor(
        private route: ActivatedRoute,
        private _router: Router,
        private _productService: ProductService,
        private activatedRoute: ActivatedRoute) {

        // this.pageTitle += `: ${id}`;
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
}
