import { Component, OnInit, Injector } from '@angular/core';
import {CollaborationService} from '../../services/collaboration.service'
import {ActivatedRoute, Params} from '@angular/router';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [CollaborationService]
})
export class EditorComponent implements OnInit {

  editor: any;
  languages: string[] = ['Java', 'Python'];
  language: string = 'Java';

  sessionId: string;

  output: string;

  defaultContent = {
    'Java': `public class Example {
      public static void main(String[] args) {
          // Type your Java code here
      }
    }`,
    'C++': `#include <iostream>
    using namespace std;
    ​
    int main() {
       // Type your C++ code here
       return 0;
     }`,
    'Python': `class Solution:
     def example():
     # Write your Python code here`
  };

  constructor(private collaboration: CollaborationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
        .subscribe(params=>{
          this.sessionId = params['id'];
          this.initEditor();
        });
      }
    initEditor(){
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();
    this.editor.setValue(this.defaultContent['Java']);
    this.editor.$blockScrolling = Infinity;

    document.getElementsByTagName('textarea')[0].focus();
    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    this.editor.on("change", (e)=>{
      console.log('editor changes: '+JSON.stringify(e));
      if(this.editor.lastAppliedChange != e){
        this.collaboration.change(JSON.stringify(e));
      }
    })
  }

  resetEditor(): void {
      this.editor.setValue(this.defaultContent[this.language]);
      this.editor.session.setMode("ace/mode/" + this.language.toLowerCase());
  }

  setLanguage(language: string): void {
      this.language = language;
      this.resetEditor();
  }

  submit(): void {
      let user_code = this.editor.getValue();
      console.log("The user code is --------------");
      console.log(user_code);
  }

}
