import { Component, OnInit, Injector } from '@angular/core';
import {Problem} from '../../models/problem.model';
import { DataService } from '../../services/data.service';
import { AuthGuardService } from '../../services/auth-guard.service';

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id: 0,
  name:"",
  desc:"",
  difficulty:"Easy"
})

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css'],
  providers: [DataService, AuthGuardService]
})
export class NewProblemComponent implements OnInit {

  public difficulties = ['Easy', "Medium", "Hard", "Super"];
  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);
  constructor(private data: DataService, private authGuard: AuthGuardService) { }

  ngOnInit() {
  }
  addProblem(): void {
    this.data.addProblem(this.newProblem)
              .catch(error=>console.log(error));
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }

  isAdmin(): boolean{
    return this.authGuard.isAdmin();
  }
}
