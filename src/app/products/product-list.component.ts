import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Router } from '@angular/router';
import { IProduct } from './product'
import { ProductFilterPipe } from './product-filter.pipe';
// import { StarComponent } from '../shared/star.component';
import { ProductService } from './product.service';

@Component({
    templateUrl: 'app/products/product-list.component.html',
    styleUrls: ['app/products/product-list.component.css'],
    pipes: [ProductFilterPipe],
    directives: [ROUTER_DIRECTIVES]
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = true;
    listFilter: string;
    errorMessage: string;
    
    products: any;

    constructor(private _productService: ProductService,
                private _router: Router){
        
    }
    
    
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
       this.products = this._productService.getProducts();
          
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
    
    
}