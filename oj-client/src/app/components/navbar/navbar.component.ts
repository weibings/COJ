import { Component, OnInit, Injector } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[AuthService]
})
export class NavbarComponent implements OnInit {
  title = "COJ";
  username = "";
  constructor(private auth: AuthService) { }

  ngOnInit() {
    //console.log("userProfile2:"+this.auth.userProfile);
    if (this.auth.userProfile) {
      this.username = this.auth.userProfile.nickname;
    }
  }

  login(): void {
    this.auth.login();
    // if(this.auth.userProfile){
    //   this.username = this.auth.userProfile.nickname;
    // }else{
    //   this.auth.getProfile((err, profile)=>{
    //   this.username = profile.nickname;
    //   });
    // }
  }
  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  logout(): void {
    this.auth.logout();
  }
}
