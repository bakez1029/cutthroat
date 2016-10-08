import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { IBarber } from './barber';

@Pipe({
    name: 'barb2Filter',
    pure: false
    
})
@Injectable()
export class Barber2FilterPipe implements PipeTransform {
    barbers: IBarber[];
    transform(barbers: IBarber[]): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        return barbers.filter(barbers => barbers.barberId >= 3 && barbers.barberId <= 5);
        
    } 
            
    
}