import { Component, OnInit, Injector } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[AuthService]
})
export class ProfileComponent implements OnInit {
  email: string = "";
  username: string ="";
  profile: any;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    console.log("profile: "+this.profile);
    if(this.auth.userProfile){
      this.profile = this.auth.userProfile;
      this.username = this.profile.nickname;
      this.email = this.profile.email;
      console.log('email: '+this.email);
    }else{
      this.auth.getProfile((err, profile)=>{
        this.profile = profile;
        this.username = this.profile.nickname;
        this.email = this.profile.name;
        console.log("email: "+this.email);
        console.log('keys: '+Object.keys(this.profile));
      });
    }


  }
  resetPassword(){
    this.auth.resetPassword();
  }
}
