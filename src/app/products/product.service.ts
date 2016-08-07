import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {
    private _productUrl = 'api/products/products.json';

    constructor(private _http: Http) { }
   
  getProducts (): Observable<IProduct[]> {
    return this._http.get(this._productUrl)
                    .map((response: Response) => <IProduct[]>response.json())
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
//     getProducts(): Observable<IProduct[]> {
//         return this._http.get(this._productUrl)
//             .map((response: Response) => <IProduct[]>response.json())
//             .do(data => console.log("All: " +  JSON.stringify(data)))
//             .catch(this.handleError);
//     }

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

// }