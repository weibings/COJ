import { Component, OnInit, Injector } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';
import {Subscription} from 'rxjs';
//import { PROBLEMS } from '../../mock-problems'
@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css'],
  providers: [DataService]
})
export class ProblemListComponent implements OnInit {
  problems: Problem[] = [];
  subscriptionProblems: Subscription;
  constructor(private data : DataService) { }

  ngOnInit() {
    //this.problems = PROBLEMS;
    this.getProblems();
  }

  getProblems() : void {
    this.subscriptionProblems = this.data.getProblems()
                                          .subscribe(problems=>this.problems = problems);
  }
}
