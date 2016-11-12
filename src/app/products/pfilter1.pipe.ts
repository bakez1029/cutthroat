import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { IProduct } from './product';

@Pipe({
    name: 'pFilter',
    pure: false
    
})
@Injectable()
export class PFilterPipe implements PipeTransform {
    barbers: IProduct[];
    transform(product: IProduct[]): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        return product.filter(product => product.productId <= 8);
        
    } 
            
    
}