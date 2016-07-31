// import { Component, OnInit } from '@angular/core';
// import { RouteSegment, Router } from '@angular/router';
// import { ProductService } from './product.service';
// import { IProduct } from './product';



// @Component({
//     templateUrl: 'app/products/product-detail.component.html',


// })
// export class ProductDetailComponent  {
//     pageTitle: string = 'Product Info';
//     products: IProduct[];
//     errorMessage: string;
//     productName: string = '';
//     productBrand: string = '';
//     product: IProduct;
//     productId: number = 0;
//     productPrice: number = 0;
//     releaseDate: string = '';
//     description: string = '';
//     imageUrl: string = '';





//     constructor(private _segment: RouteSegment,
//         private _router: Router,
//         private _productService: ProductService) {

    
//     this.productId = +_segment.getParam('id');

//     // this.pageTitle += `: ${id}`;
// }

//     ngOnInit(): void {
//        this._productService.getProducts()
//             .subscribe(
//                 products => { 
//                 this.products = products
//                 this.product = this.products[this.productId-1];
//                 this.productName = this.product.productName;
//                 this.productBrand = this.product.productBrand;
//                 this.productPrice = this.product.price;
//                 this.releaseDate = this.product.releaseDate;
//                 this.description = this.product.description;
//                 this.imageUrl = this.product.imageUrl;
               
//     },

//      error => this.errorMessage = <any>error);
//     }
//     onBack(): void {
//         this._router.navigate(['/products']);
//     }
    
 


// }
