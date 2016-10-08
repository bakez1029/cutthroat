import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuth, AuthProviders} from 'angularfire2';
@Injectable()
export class AppService {
    user: FirebaseObjectObservable<any>;
    address: FirebaseObjectObservable<any>;
    uid: string;
    authed: boolean = false;
    me: string
    mike: string;

    constructor(public af: AngularFire) {
        // this.af.auth.subscribe((auth) => {
        //     console.log(auth, "called");
        //     if (auth == null || (auth == null && auth.uid == null)) {
        //         this.authed = false;
        //         console.log('User is not logged in!')

        //     }
        //     else {
        //         this.authed = true;
        //         this.uid = auth.uid;
        //         console.log('User is logged in! - Here is their uid :', auth.uid);
        //         this.af.database.list('/users').subscribe((_users) => {
        //             const filtered = _users.filter(user => user.uid === auth.uid);
        //             this.user = this.af.database.object('/users/' + filtered[0].$key);
        //             this.address = this.af.database.object('/users/' + filtered[0].$key + '/address');
        //             this.me = _users[3].uid;
        //             this.mike = _users[4].uid;
        //             console.log('Here are the Admin uids -', this.mike, this.me);

        //         })
        //     }
        // })
    }
    getUsers() {}
}


