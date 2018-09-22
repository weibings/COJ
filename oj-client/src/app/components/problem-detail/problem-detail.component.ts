import { Component, OnInit } from '@angular/core';
import {Problem} from '../../models/problem.model';
import {ActivatedRoute, Params} from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css'],
  providers: [DataService]
})
export class ProblemDetailComponent implements OnInit {
  problem: Problem
  constructor(
    private route : ActivatedRoute,
    private data : DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.data.getProblem(+params["id"])
                .then(problem=>this.problem = problem);
    });
  }

}
