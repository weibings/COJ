import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import {routingModule} from './app.routes'
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';

import {DataService} from './services/data.service';
import {CollaborationService} from './services/collaboration.service';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditorComponent } from './components/editor/editor.component';


@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent,
    ProfileComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    routingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DataService, AuthService, AuthGuardService, CollaborationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
