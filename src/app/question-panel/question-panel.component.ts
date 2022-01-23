import { Component, OnInit } from '@angular/core';

interface Answer {
  questionNumber: number;
  questionAnswerIndex: number;
}

@Component({
  selector: 'question-panel',
  templateUrl: './question-panel.component.html',
  styleUrls: ['./question-panel.component.scss']
})
export class QuestionPanelComponent implements OnInit {

  public currentQuestion: number = 0;
  private selectedAnswers: Answer[] = [];

  public selectedOptionIndex: number | undefined;
  public question: any | undefined;

  public allQuestions = [
    {
      title: "Pytanie 1",
      options: [
        {option: "Odpowiedz A."},
        {option: "Odpowiedz B."},
        {option: "Odpowiedz C."},
        {option: "Odpowiedz D."}
      ],
      goodAnswer: "Odpowiedz C."
    },
    {
      title: "Pytanie 2",
      options: [
        {option: "Odpowiedz 1."},
        {option: "Odpowiedz 2."},
        {option: "Odpowiedz 3."},
        {option: "Odpowiedz 4."}
      ],
      goodAnswer: "Odpowiedz 4."
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.question = this.allQuestions[this.currentQuestion];
  }

  getNextQuestion() {
    if (this.selectedOptionIndex) {
      if (this.currentQuestion < this.allQuestions.length - 1) {
        this.saveAnswerForCurrentQuestion();

        this.currentQuestion++;
        this.question = this.allQuestions[this.currentQuestion];
        this.selectedOptionIndex = undefined;
      } else {

      }
    }
  }

  saveAnswerForCurrentQuestion() {
    let answer = {} as Answer;
    answer.questionNumber = this.currentQuestion;
    if (this.selectedOptionIndex != null) {
      answer.questionAnswerIndex = this.selectedOptionIndex;
    }
    this.selectedAnswers.push(answer)
  }

  selectOption(index: number) {
    this.selectedOptionIndex = index;
  }
}
