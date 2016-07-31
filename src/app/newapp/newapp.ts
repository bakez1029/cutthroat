// import { Component } from '@angular/core';
// import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuth, AuthProviders} from 'angularfire2';


// @Component({
//   moduleId: module.id,
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.css']
// })
// export class AppComponent {
//   title = 'Updating Data';
//   user: FirebaseObjectObservable<any>;
//   users: FirebaseListObservable<any[]>;
//   addresses: FirebaseListObservable<any[]>;
//   address: FirebaseObjectObservable<any>;
//   constructor(af: AngularFire, private auth: FirebaseAuth) {
//     this.users = af.database.list('users');
//     this.addresses = af.database.list('users/key/address');
//     this.address = af.database.object('users/key/address');
//     this.user = af.database.object('/users/key');
//   }
//   save(newName: string) {
//     this.user.set({ name: newName });
//   }
//   update(newName: string, newPhone: string, newProfilePic: string, newAddress: string, newCity: string, newState: string, newZip, string) {
//     this.user.update({ name: newName, phone: newPhone, profilepic: newProfilePic });
//     this.address.update({ address: newAddress, city: newCity, state: newState, zip: newZip });
//   }
//   delete() {
//     this.user.remove();
//   }

//   public login(email: string, password: string) {
//     console.log(email, password);
//     this.auth.login({
//       email: email, password: password,
//       provider: AuthProviders.Password
//     })

//   }

//   public logout() {
//     this.auth.logout()
//   }


//   registerUser(email: string, password: string, cpassword: string) {
//     console.log(email, password, cpassword)
//     if (password === cpassword && email.trim() != '') {
//       this.auth.createUser({ email: email, password: password }).then((auth) => {
//         this.auth.login({ email: email, password: password, provider: AuthProviders.Password }).then((loginData) =>
//           console.log(loginData),
//           this.users.push({ email: email, password: password, uid: auth.uid }));

//       });
//     }
//     else {
//       console.log("Invalid passwords");
//       alert("Passwords did not match.")
//     }
//   }


// }
