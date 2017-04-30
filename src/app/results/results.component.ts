import {Component, OnInit, OnDestroy} from '@angular/core';
import {StackOverFlowService} from '../services/stackoverflow.service';
import {Subscription, Observable} from "rxjs/Rx";
import {ActivatedRoute, Router} from "@angular/router";
import IColumns = entities.table.IColumns;

@Component({
    styleUrls: ['./results.component.css'],
    templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit, OnDestroy {
    private resultItems:any = [];
    private sub: Subscription;
    public params:IColumns = {
        author: {
            show: true,
            clickable: true
        },
        theme: {
            show: true,
            clickable: true
        },
        tags: {
            show: true,
            clickable: true
        },
        answers: {
            show: false,
            clickable: false
        }
    };

    constructor (private StackOverFlowService_:StackOverFlowService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.resultItems = this.StackOverFlowService_.getResultItems();
        if (this.resultItems.length === 0) {
            this.sub = this.route
                .queryParams
                .flatMap((params:any) => this.StackOverFlowService_.getQuestionsByKeyWord(params.query))
                .subscribe(
                    (result:any) => {
                        if(result.length) {
                            this.resultItems = result;
                        } else {
                            this.router.navigate(['']);
                        }
                    },
                    (error:any) => {
                        console.error(error);
                        this.router.navigate(['']);
                    }
                );
            }
    }

    ngOnDestroy() {
        if(this.sub) {
            this.sub.unsubscribe();
        }
    }
}