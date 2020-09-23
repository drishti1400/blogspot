import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { Xuser } from './user';
//import{ Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  displayName: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  xuser=new Subject<Xuser>();
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;
  token: string;
  currentUser: any;
  userv= new Subject<String>();
  setUserStatus(xuser: any): void {
    this.xuser.next(xuser);
  }

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
   }

   getUserState() {
    return this.afAuth.authState;
  }

  login( email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
        this.token=userCredential.user.uid
        //console.log(userCredential.user);
         //console.log(userCredential.user);
        const xuser = new Xuser(userCredential.user.email,userCredential.user.displayName,userCredential.user.uid);
        this.xuser.next(xuser);
        this.db.collection('Users').ref.where("uid", "==", userCredential.user.uid).onSnapshot(snap=>{
         snap.forEach(userRef => {
            console.log("userRef", userRef.data());
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser)
            if(userRef.data().role !== "admin") {
              this.userv.next('user');
              this.router.navigate(["/notelist"]);
            }else{
              this.userv.next('admin');
              this.router.navigate(["/edit"]);
            }
         })
        })
         this.router.navigateByUrl('/notelist');
       }
      })
    }

  createUser(user){
    this.afAuth.createUserWithEmailAndPassword(user.email,user.password)
    .then( userCredential =>{
      this.newUser= user;
      console.log(userCredential);
      userCredential.user.updateProfile({
        displayName: user.firstname + '' + user.lastname
      })
      this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      displayName: this.newUser.firstname +" " + this.newUser.lastname,
      uid: userCredential.user.uid,
      role: 'user'
      }).then(()=>{
           console.log("success");
           this.router.navigateByUrl('/notelist');
        })
        const xuser = new Xuser(userCredential.user.email,userCredential.user.displayName,userCredential.user.uid);
        this.xuser.next(xuser);
      }).catch(error => {
        console.log(error);
        this.eventAuthError.next(error);
      });
  }

  logout() {
    this.xuser.next(null)
    return this.afAuth.signOut()
    .then(() =>console.log("signedout"))
  .catch(() => console.log('Error signing out'));
  }
  
  loggedIn(){
    return !!localStorage.getItem(this.token);
  }

}
