import { Injectable } from '@angular/core';
import {Problem} from '../models/problem.model';
//import {PROBLEMS} from '../mock-problems';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
//import {Observable} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: HttpClient) { }

  getProblems(): Observable<Problem[]>{
    this.http.get<Problem[]>("api/v1/problems")
      .toPromise()
      .then((res: Problem[])=>{
        this.problemsSource.next(res);
      })
      .catch(this.handleError);
      return this.problemsSource.asObservable();
  }

  // handle error
  private handleError(error: any): Promise<any>{
    console.error('An error occured', error);
    return Promise.reject(error.body | error);
  }

  getProblem(id: number) : Promise<Problem> {
    return this.http.get(`api/v1/problems/${id}`)
                    .toPromise()
                    .then((res: Problem) => res)
                    .catch(this.handleError);
  }

  addProblem(problem: Problem): Promise<Problem> {
    let headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post('api/v1/problems', problem, {headers})
                    .toPromise()
                    .then((res: Problem)=>{
                      this.getProblems();
                      return res;
                    })
                    .catch(this.handleError);
  }
}
