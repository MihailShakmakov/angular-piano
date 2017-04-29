import {Component, OnInit, OnDestroy} from '@angular/core';
import {StackOverFlowService} from '../services/stackoverflow.service';
import {Subscription, Observable} from "rxjs/Rx";
import {ActivatedRoute, Router} from "@angular/router";
import IColumns = entities.table.IColumns;

@Component({
    templateUrl: './questions.component.html'
})
export class QuestionsComponent implements OnInit, OnDestroy {
    private resultItems:any = [];
    private sub: Subscription;
    public author_name: string = '';
    public params:IColumns = {
        author: {
            show: false,
            clickable: false
        },
        theme: {
            show: true,
            clickable: false
        },
        tags: {
            show: true,
            clickable: false
        }
    };

    constructor (private StackOverFlowService_:StackOverFlowService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.resultItems = this.StackOverFlowService_.getQuestionItems();
        if (this.resultItems.length === 0) {
            this.sub = this.route
                .params
                .flatMap((params:any) => this.StackOverFlowService_.questions(params.authorId))
                .subscribe(
                    (result:any) => {
                        debugger;
                        if(result.length) {
                            this.author_name = result[0].owner.display_name;
                            this.resultItems = result;
                        } else {
                            
                        }
                    },
                    (error:any) => {
                        console.error(error);
                    }
                );
        } else {
            this.author_name = this.resultItems[0].owner.display_name;
        }
    }

    ngOnDestroy() {
        if(this.sub) {
            this.sub.unsubscribe();
        }
    }
}