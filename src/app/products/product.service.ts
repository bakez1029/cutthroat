import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
    private _productUrl = 'api/products/products.json';

    constructor(private _http: Http) { }

    getProducts() {
        return this._http.get(this._productUrl)
                       .toPromise()
               .then(response => response.json().data as IProduct[])
          
  }
    }

//         get(id: number) { 
//      return this.getProducts().map(all => { 
//        if (localStorage['productId' + id]) { 
//          return JSON.parse(localStorage['productId' + id]); 
//        } 
//        return all.find(e => e.productId === id); 
//      }); 
//    } 


//     private handleError(error: Response) {
//         console.error(error);
//         return Observable.throw(error.json().error || 'Server error');
//     }

