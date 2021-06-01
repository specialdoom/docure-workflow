import { Injectable } from "@angular/core";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { BehaviorSubject } from "rxjs";

const firebaseConfig = {
  apiKey: "AIzaSyD7PwK_VCBVFr05RNjIfo1Bd7xHMltsXS0",
  authDomain: "docure-9a8dd.firebaseapp.com",
  projectId: "docure-9a8dd",
  storageBucket: "docure-9a8dd.appspot.com",
  messagingSenderId: "232653407671",
  appId: "1:232653407671:web:1c93f808df816815ec1432",
  databaseURL: "https://docure-9a8dd-default-rtdb.europe-west1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseConfig);



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: firebase.auth.Auth;
  provider: firebase.auth.GoogleAuthProvider;
  currentUser: any = {};
  private authStatusSub = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSub.asObservable();

  constructor() {
    this.auth = firebase.auth();
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    this.provider = new firebase.auth.GoogleAuthProvider();

    this.auth.onAuthStateChanged(state => {
      if (state) {
        this.authStatusSub.next(state);
      } else {
        this.authStatusSub.next(null);
      }
    })

    this.auth.getRedirectResult().then(result => {
      if (result.user) {
        this.authStatusSub.next(result.user);
      }
    })

  }

  login() {
    this.auth.signInWithRedirect(this.provider);
  }

  logout() {
    this.auth.signOut();
  }
}