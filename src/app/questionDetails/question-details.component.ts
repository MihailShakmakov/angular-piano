import {Component, OnInit, OnDestroy} from '@angular/core';
import {StackOverFlowService} from '../services/stackoverflow.service';
import {Subscription, Observable} from "rxjs/Rx";
import {ActivatedRoute, Router} from "@angular/router";
import IColumns = entities.table.IColumns;

@Component({
    templateUrl: './question-details.component.html'
})
export class QuestionDetailsComponent implements OnInit, OnDestroy {
    private resultItems:any = [];
    private sub: Subscription;
    public question_title: string = '';
    public params:IColumns = {
        author: {
            show: true,
            clickable: false
        },
        theme: {
            show: false,
            clickable: false
        },
        tags: {
            show: false,
            clickable: false
        },
        answers: {
            show: true,
            clickable: true
        }
    };

    constructor (private StackOverFlowService_:StackOverFlowService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.sub = this.route
            .params
            .flatMap((params:any) => this.StackOverFlowService_.getAnswers(params.questionId))
            .subscribe(
                (result:any) => {
                    if(result.length) {
                        this.resultItems = result;
                        this.question_title = result[0].title;
                    } else {

                    }
                },
                (error:any) => {
                    console.error(error);
                }
            );
    }

    ngOnDestroy() {
        if(this.sub) {
            this.sub.unsubscribe();
        }
    }
}