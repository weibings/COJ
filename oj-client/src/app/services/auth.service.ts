// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/toPromise';

(window as any).global = window;

@Injectable()
export class AuthService {
  clientID: string = 'Q4XsNsLRP2aU7pYf5fJvdM3c5tGIxWke';
  domain: string = 'binwei1988.auth0.com';
  auth0 = new auth0.WebAuth({
    clientID: this.clientID,
    domain: this.domain,
    responseType: 'token id_token',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid profile'
  });

  userProfile: any;

constructor(public router: Router, private http: HttpClient) {}

public login(): void {
  this.auth0.authorize();

}
public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
      // Set the time that the Access Token will expire at
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    }

    public logout(): void {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      // Go back to the home route
      this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
      // Check whether the current time is past the
      // Access Token's expiry time
      const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
      return new Date().getTime() < expiresAt;
    }

    public getProfile(cb): void {
      const accessToken = localStorage.getItem('access_token');
      //console.log("token: "+accessToken);
      if (!accessToken) {
        throw new Error('Access Token must exist to fetch profile');
      }

      const self = this;
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          self.userProfile = profile;

        }
        cb(err, profile);
      });
    }

    public resetPassword(){
      let profile = this.userProfile;
      let url: string = `https://${this.domain}/dbconnections/change_password`;
      let headers = new HttpHeaders().set('content-type','application/json');
      console.log("profile-email "+profile.name);
      let body = {
        client_id: this.clientID,
        email: profile.name,
        connection: 'Username-Password-Authentication'
       };
      this.http.post(url, body, {headers})
              .toPromise()
              .then((res: any)=>{
                console.log(res.json());
              })
              .catch(this.handleError);
    }

    private handleError(error: any): Promise<any>{
      console.error('An error occured', error);
      return Promise.reject(error.body | error);
    }
  }
