import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'app/test/test.component.html'
})
export class TestComponent {
    public pageTitle: string = "Testimonials";
    
    //     constructor(private _routeParams: RouteParams,
    //             private _router: Router) {
    //      _routeParams.get('/testimonials2');

    // }
    //  onClick2(): void {
    //     this._router.navigate(['Testimonials2']);
    //  }
     
    //   onBack(): void {
    //     this._router.navigate(['Testimonials']);
    // }
    
}
