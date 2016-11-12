import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { IProduct } from './product';

@Pipe({
    name: 'pFilter2',
    pure: false
    
})
@Injectable()
export class PFilterPipe2 implements PipeTransform {
    barbers: IProduct[];
    transform(product: IProduct[]): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        return product.filter(product => product.productId > 8 && product.productId <= 17);
        
    } 
            
    
}