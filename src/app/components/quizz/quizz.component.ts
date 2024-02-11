// import { Component, OnInit } from '@angular/core';
// import quizz_questions from '../../../assets/data/quizz_question.json'
// @Component({
//   selector: 'app-quizz',
//   templateUrl: './quizz.component.html',
//   styleUrls: ['./quizz.component.css']
// })
// export class QuizzComponent implements OnInit {
//   title:string = ""

//   questions: any
//   questionSelected: any

//   answers:string[] = []
//   answerSelected:string=''

//   questionIndex:number = 0
//   questionMaxIndex:number = 0

//   finished:boolean = false
//   constructor() { }

//   ngOnInit(): void {
//     if(quizz_questions) {
//       this.finished = false
//       this.title = quizz_questions.title

//       this.questions = quizz_questions.questions
//       this.questionSelected = this.questions[this.questionIndex]

//       this.questionIndex = 0
//       this.questionMaxIndex = this.questions.length

//       console.log(this.questionIndex)
//       console.log(this.questionMaxIndex)
//     }
//   }
//   playerChoose(value: string) {
//     this.answers.push(value)
//     this.nextStep()
//   }
//   nextStep() {
//     this.questionIndex += 1
//     if(this.questionMaxIndex > this.questionIndex) {
//       this.questionSelected = this.questions[this.questionIndex]
//     } else {
//       this.finished = true
//     }
//   }
//   // splitQuestionText(questionText: string): { before: string, after: string } {
//   // const before = questionText.slice(0, 16);
//   // const after = questionText.slice(16);
//   // return { before, after };
//   // }


// }
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import quizz_questions from '../../../assets/data/quizz_question_hacker.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500)),
    ]),
    trigger('fadeInOutButton', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(100)),
    ])
  ]
})
export class QuizzComponent implements OnInit {
  title:string = "";
  questions: any;
  questionSelected: any;
  answers:string[] = [];
  answerSelected:string='';
  questionIndex:number = 0;
  questionMaxIndex:number = 0;
  finished:boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;

      console.log(this.questionIndex);
      console.log(this.questionMaxIndex);
      console.log(this.answerSelected)
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;
    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true;
      this.answerSelected = quizz_questions.results[
        finalAnswer as keyof typeof quizz_questions.results
      ]
      console.log(this.answers)
    }
  }
  async checkResult(anwsers:string[]) {
    const result = anwsers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous
      } else {
        return current
      }
    })
    return result
  }
  teste() {
    console.log(this.answerSelected)
  }
}

