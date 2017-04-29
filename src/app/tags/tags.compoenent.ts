import {Component, OnInit, OnDestroy} from '@angular/core';
import {StackOverFlowService} from '../services/stackoverflow.service';
import {Subscription, Observable} from "rxjs/Rx";
import {ActivatedRoute, Router} from "@angular/router";
import IColumns = entities.table.IColumns;

@Component({
    templateUrl: './tags.component.html'
})
export class TagsComponent implements OnInit, OnDestroy {
    private resultItems:any = [];
    private sub: Subscription;
    public tag: string = '';
    public params:IColumns = {
        author: {
            show: true,
            clickable: false
        },
        theme: {
            show: true,
            clickable: false
        },
        tags: {
            show: false,
            clickable: false
        }
    };

    constructor (private StackOverFlowService_:StackOverFlowService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.resultItems = this.StackOverFlowService_.getTagItems();
        if (this.resultItems.length === 0) {
            this.sub = this.route
                .params
                .flatMap((params:any) => {
                    this.tag = params.tag;
                    return this.StackOverFlowService_.tags(params.tag);
                })
                .subscribe(
                    (result:any) => {
                        if(result.length) {
                            this.resultItems = result;
                        } else {

                        }
                    },
                    (error:any) => {
                        console.error(error);
                    }
                );
        } else {
            this.sub = this.route
                .params
                .subscribe((params:any)=>{this.tag=params.tag});
        }
    }

    ngOnDestroy() {
        if(this.sub) {
            this.sub.unsubscribe();
        }
    }
}