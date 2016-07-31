import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuth, AuthProviders} from 'angularfire2';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'welcome.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class WelcomeComponent {
    public pageTitle: string = "Welcome";


    images: any[];
    
    // msgs: Message[] = [];
    
    display: boolean = false;

title = 'Updating Data';

  
  constructor(public af: AngularFire, private auth: FirebaseAuth, private router: Router) {

  

    
    

//     ngOnInit() {

//          this.images = [];
//          this.images.push({source:'img/photos/pic1.jpg', alt:'Description for Image 1', title:'Title 1'});
//          this.images.push({source:'img/photos/pic2.jpg', alt:'Description for Image 2', title:'Title 2'});
//          this.images.push({source:'img/photos/pic3.jpg', alt:'Description for Image 3', title:'Title 3'});
//          this.images.push({source:'img/photos/pic4.jpg', alt:'Description for Image 4', title:'Title 4'});
//          this.images.push({source:'img/photos/pic5.jpg', alt:'Description for Image 5', title:'Title 5'});
//          this.images.push({source:'img/photos/pic6.jpg', alt:'Description for Image 6', title:'Title 6'});
//          this.images.push({source:'img/photos/pic7.jpg', alt:'Description for Image 7', title:'Title 7'});
//          this.images.push({source:'img/photos/pic8.jpg', alt:'Description for Image 8', title:'Title 8'});
//          this.images.push({source:'img/photos/pic9.jpg', alt:'Description for Image 9', title:'Title 9'});
//          this.images.push({source:'img/photos/pic10.jpg', alt:'Description for Image 10', title:'Title 10'});
  
      
//     }
    
//     showWarn() {
//         this.msgs = [];
//         this.msgs.push({severity:'warn', summary:'Warn Message', detail:'There are unsaved changes'});
//     }
    
//     show() {
//     this.msgs.push({severity:'info', summary:'Info Message', detail:'Jeff Rocks'});
// }

//     clear() {
//     this.msgs = [];
// }

//     showDialog() {
//         this.display = true;
//     }


  }
     
      onClick(): void {
         this.router.navigate(['/barbers']);
        
     }
      onClick2(): void {
     this.router.navigate(['/products']);
 }
    
      onClick3(): void {
     this.router.navigate(['/artists']);
 }

  onClick4(): void {
     this.router.navigate(['/jobs']);
 }

}