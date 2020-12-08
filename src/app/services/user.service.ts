import { Injectable } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth: boolean = false;
  private SERVER_URL = 'http://localhost:3000/api';

  authState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.auth);
  userData$: BehaviorSubject<SocialUser | ResponseModel> = new BehaviorSubject<SocialUser | ResponseModel>(null);

  constructor(private authService: SocialAuthService, private httpClient: HttpClient) {

    authService.authState.subscribe( (user) => {
      if (user != null ) {
        this.auth = true;
        this.authState$.next(this.auth);
        this.userData$.next(user);
      }
    });

  }

  loginUser(email: string, password: string){
    this.httpClient.post( `${this.SERVER_URL}/auth/login`, {email, password})
                    .subscribe( (data: ResponseModel) => {
                      this.auth = data.auth;
                      this.authState$.next(this.auth);
                      this.userData$.next(data);
                    });
  }

  googleLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut() {
    this.authService.signOut();
    this.auth = false;
    this.authState$.next(this.auth);
  }



}

export interface ResponseModel {
  token: string;
  auth: boolean;
  email: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
}
