import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { IBarber } from './barber';

@Pipe({
    name: 'barbFilter',
    pure: false
    
})
@Injectable()
export class BarberFilterPipe implements PipeTransform {
    barbers: IBarber[];
    transform(barbers: IBarber[]): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        return barbers.filter(barbers => barbers.barberId <= 2);
        
    } 
            
    
}