import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { IBarber } from './barber';
import { BarberFilterPipe } from './barber.filter.pipe';
import { Barber2FilterPipe } from './barber2.filter.pipe';
import { Barber3FilterPipe } from './barber3.filter.pipe';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { BarberService } from './barber.service';

@Component({
    templateUrl: 'app/barbers/barbers.component.html',
    pipes: [BarberFilterPipe, Barber2FilterPipe, Barber3FilterPipe],
    directives: [ROUTER_DIRECTIVES],
})
export class BarbersComponent implements OnInit {
    public pageTitle: string = "Barbers";
    errorMessage: string;
    imageWidth: number = 200;
    imageHeight: number = 200;
    imageMargin: number = 2;
    barbers: IBarber[];

 

    constructor(
        private _router: Router,
        private BarberService: BarberService) {
        console.log(this.barbers)
    }

    ngOnInit() {
        this.BarberService.getBarbers()
            .subscribe(barbers => this.barbers = barbers,
            error => this.errorMessage = <any>error);


    }

    onBack(): void {
        this._router.navigate(['/barbers']);
    }
}