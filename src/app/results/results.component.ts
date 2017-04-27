import {Component, OnInit, OnDestroy} from '@angular/core';
import {SearchService} from '../search/search.service';
import {Subscription, Observable} from "rxjs/Rx";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    styles: [`
        .table {
            border-collapse: collapse;
            width: 100%;
        }
        .table-row {
            background: #fff;
            border-top: 1px solid #aaa;
            height: 50px;
        }
        .table-row:last-child {
            border-bottom: 1px solid #aaa;
        }
        .table-row.table-row--head {
            background: #f0f0f0;
        }
        .table-row__cell {
            text-align: center;
            vertical-align: middle; 
            padding: 0.5em 1em;
        }
        
        .result-columns {
            display: flex;
        }
        
        .result-columns__table {
            width: 55%;
        }
        
        .result-columns__quick-view {
            width: 45%;
            min-height: 500px;
            border-left: 10px solid #aaa;
        }
        
        @media(max-width: 768px) {
            .result-columns {
                flex-direction: column;
            }
            .result-columns__table {
                width: 100%;
            }
            .result-columns__quick-view {
                width: 100%;
                min-height: 500px;
                border-left: 0;
                border-top: 10px solid #aaa;
            }
        }
        
    `],
    template: `
    <div class="result-columns">
        <div class="result-columns__table">
            <h2 align="center">Search results</h2>
            <table class="table">
                <thead class="table-row table-row--head">
                    <th class="table-row__cell">Author</th>
                    <th class="table-row__cell">Themes(answers)</th>
                    <th class="table-row__cell">Tags</th>
                </thead>
                <tbody>
                    <tr *ngFor="let result of resultItems" class="table-row">
                        <td class="table-row__cell">{{result.owner.display_name}}</td>
                        <td class="table-row__cell">{{result.title + '(' + result.answer_count + ')'}}</td>
                        <td class="table-row__cell">
                            <span *ngFor="let tag of result.tags; let i = index">
                                {{tag}}<span *ngIf="i !== (result.tags.length - 1)">, </span>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="result-columns__quick-view">
            <h2 align="center">Quick view</h2>
            <router-outlet></router-outlet>
        </div>
   </div>
   `
})
export class ResultsComponent implements OnInit, OnDestroy {
    private resultItems:any = [];
    private sub: Subscription;

    constructor (private SearchService_:SearchService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.resultItems = this.SearchService_.getResultItems();
        if (this.resultItems.length === 0) {
            this.sub = this.route
                .queryParams
                .flatMap((params:any) => this.SearchService_.search(params.query))
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