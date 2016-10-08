import { Component, OnInit, Host} from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods } from 'angularfire2';
import {FirebaseAuth} from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { FORM_DIRECTIVES } from '@angular/common';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import { User } from './user.interface';


@Component({
templateUrl: 'app/jobs/jobs.component.html',
 })


export class JobsComponent implements OnInit {
  pageTitle: string = "Jobs";
  title = 'Jobs';
  form: any;
  states: string[];
  submitted: boolean = false;
  users: FirebaseListObservable<any>;
 


  
  constructor(public af: AngularFire,
  private router: Router)   { 
  this.users = af.database.list('/forms');
  }

 public user: User;

  ngOnInit() {
    this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming' ];


    // we will initialize our form here
    this.user = {
        name: '',
        phone: '',
        email:'',
        address: {
            street: '',
            postcode: '', // set default value to 8000
            state: '',
        }
        
    };
  }




  onSubmit(form: any)  {
    this.submitted = true;
    this.form = form;
     this.users.push({ApplicantInfo: form});
          this.router.navigate(['/']),
          alert("Your information was submitted.");
  }

}