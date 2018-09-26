import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

  // isAdmin(): boolean {
  //   if(this.auth.isAuthenticated()){
  //     this.auth.getProfile((err, profile)=>{
  //       console.log("keys: "+Object.keys(profile));
  //       if(profile.roles.includes("Admin")){
  //         return true;
  //       }else{
  //         return false;
  //       }
  //     });
  //   }
  //   return false;
  // }

}
