import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WuserService {

  constructor(private firestore: AngularFirestore) { }

  getArticles(): Observable<any>{
    return this.firestore.collection('news').snapshotChanges();
  }
}
