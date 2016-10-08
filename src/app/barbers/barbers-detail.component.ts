import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { IBarber} from './barber';
import { BarberService } from './barber.service';

@Component({
    templateUrl: 'app/barbers/barbers-detail.component.html',
})
export class BarbersDetailComponent implements OnInit{
    pageTitle: string = 'Barber Info';
    barberName: string;
    barberBio: string;
    barberPic: string;
    barberNick: string;
    barberInsta: string;
    instaName: string;
    previewCut: string;
    barberId: number = 0;
    errorMessage: string;
    barbers: IBarber[];
    barber: IBarber;
    paramsSub: any;
  


    constructor(

        private _router: Router,
        private _BarberService: BarberService,
        private activatedRoute: ActivatedRoute) {

    }

      ngOnInit() {

        this.paramsSub = this.activatedRoute.params.subscribe(params => {
            this.barberId = parseInt(params['id'], 10);
            console.log('barberid', this.barberId);
        });

        this._BarberService.getBarbers()
            .subscribe(
            barbers => {
                this.barbers = barbers
                this.barber = this.barbers[this.barberId];
                this.barberName = this.barber.barberName;
                this.barberBio = this.barber.barberBio;
                this.barberPic = this.barber.barberPic;
                this.barberNick = this.barber.barberNick;
                this.barberInsta = this.barber.barberInsta;
                this.instaName = this.barber.instaName;
                this.previewCut = this.barber.previewCut;
                console.log(this.barberName)
               
            },

            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this._router.navigate(['/barbers']);
    }
}

