import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SummaryModalComponent} from "../summary-modal/summary-modal.component";
import {Answer} from "../data/Answer";
import {SummaryData} from "../data/SummaryData";

@Component({
  selector: 'question-panel',
  templateUrl: './question-panel.component.html',
  styleUrls: ['./question-panel.component.scss']
})
export class QuestionPanelComponent implements OnInit {

  public currentQuestion: number = 0;
  public goodAnswersAmount: number = 0;
  public selectedAnswers: Answer[] = [];

  public selectedOptionIndex: number | undefined;
  public question: any | undefined;

  public allQuestions = [
    {
      title: "Polis to:",
      options: [
        {option: "Posiadłość danego państwa leżąca poza jego granicami"},
        {option: "Greckie miasto-państwo"},
        {option: "Świątynia Ateny"},
        {option: "Wzgórze świątynne"}
      ],
      goodAnswer: "Greckie miasto-państwo"
    },
    {
      title: "Demokracja to:",
      options: [
        {option: "System rządzenia, w ktorym władzę sprawują obywatele"},
        {option: "Główny plac w dawnej polis"},
        {option: "Nauka zajmująca się rozważaniem najważniejszych dla człowieka spraw"},
        {option: "Czteroletni okres między igrzyskami"}
      ],
      goodAnswer: "System rządzenia, w ktorym władzę sprawują obywatele"
    },
    {
      title: "Perykles to:",
      options: [
        {option: "Grecki Rzeźbiarz"},
        {option: "Król Sparty, dowódca trzystu w wąwozie Termopile"},
        {option: "Wybitny przywódca Aten w V wieku p.n.e"},
        {option: "Wybitny filozof grecki"}
      ],
      goodAnswer: "Wybitny przywódca Aten w V wieku p.n.e"
    },
    {
      title: "Rynek w miastach greckich to:",
      options: [
        {option: "Agora"},
        {option: "Polis"},
        {option: "Hoplita"},
        {option: "Akropol"}
      ],
      goodAnswer: "Agora"
    },
    {
      title: "Zgromadzenie ludowe to inaczej:",
      options: [
        {option: "Eklezja"},
        {option: "Agora"},
        {option: "Geruzaj"},
        {option: "Ostrakon"}
      ],
      goodAnswer: "Eklezja"
    },
    {
      title: "Heloci:",
      options: [
        {option: "To wolni obywatele Sparty"},
        {option: "Dostarczali broń dla armii"},
        {option: "Posiadali pełnię praw politycznych"},
        {option: "To niewolni chłopi"}
      ],
      goodAnswer: "To niewolni chłopi"
    },
    {
      title: "Ktore powiedzenie dotyczy Starożytnej Sparty?",
      options: [
        {option: "Oko za oko"},
        {option: "Z tarczą lub na tarczy"},
        {option: "Przybyłem zobaczyłem zwyciężyłem"},
        {option: "Kości zostały rzucone"}
      ],
      goodAnswer: "Z tarczą lub na tarczy"
    },
    {
      title: "Ilu strategów liczyło ateńskie kolegium?",
      options: [
        {option: "8"},
        {option: "9"},
        {option: "14"},
        {option: "10"}
      ],
      goodAnswer: "10"
    }
  ]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.randomizeQuestionsAndOptions();
  }

  getNextQuestion() {
    if (this.selectedOptionIndex !== undefined) {
      if (this.currentQuestion <= this.allQuestions.length - 1) {
        this.saveAnswerForCurrentQuestion();

        if (this.currentQuestion !== this.allQuestions.length - 1) {
          this.currentQuestion++;
          this.question = this.allQuestions[this.currentQuestion];
          this.selectedOptionIndex = undefined;
        } else {
          this.openSummaryDialog();
        }
      }
    }
  }

  saveAnswerForCurrentQuestion() {
    const currentQuestion = this.allQuestions[this.currentQuestion]

    let answer = {} as Answer;
    answer.questionNumber = this.currentQuestion;

    if (this.selectedOptionIndex != null) {
      answer.questionAnswerIndex = this.selectedOptionIndex;
      if (currentQuestion.options[this.selectedOptionIndex].option === currentQuestion.goodAnswer) {
        this.goodAnswersAmount = this.goodAnswersAmount + 1;
      }
    }

    this.selectedAnswers.push(answer)
  }

  selectOption(index: number) {
    this.selectedOptionIndex = index;
  }

  randomizeQuestionsAndOptions() {
    this.allQuestions = this.allQuestions.sort(() => Math.random() - 0.5);

    this.allQuestions.forEach(question => {
      question.options = question.options.sort(() => Math.random() - 0.5);
    })

    this.question = this.allQuestions[this.currentQuestion];
  }

  openSummaryDialog(): void {
    let summaryData = {} as SummaryData;
    summaryData.selectedAnswers = this.selectedAnswers;
    summaryData.questions = this.allQuestions;
    summaryData.goodAnswers = this.goodAnswersAmount;

    const dialogRef = this.dialog.open(SummaryModalComponent, {
      width: '40%',
      height: '80%',
      disableClose: true,
      data: summaryData
    });

    dialogRef.afterClosed().subscribe(() => {
      this.clearData();
      this.randomizeQuestionsAndOptions();
    });
  }

  clearData() {
    this.currentQuestion = 0;
    this.goodAnswersAmount = 0;
    this.selectedOptionIndex = undefined;
    this.selectedAnswers = [];
  }
}
