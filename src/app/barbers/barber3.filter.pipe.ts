import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { IBarber } from './barber';

@Pipe({
    name: 'barb3Filter',
    pure: false
    
})
@Injectable()
export class Barber3FilterPipe implements PipeTransform {
    barbers: IBarber[];
    transform(barbers: IBarber[]): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        return barbers.filter(barbers => barbers.barberId > 5);
        
    } 
            
    
}