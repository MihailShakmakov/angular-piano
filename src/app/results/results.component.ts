import {Component, OnInit, OnDestroy} from '@angular/core';
import {SearchService} from '../search/search.service';
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    template: `
    <div>
        <table>
            <thead>
                <th>Author</th>
                <th>Themes(answers)</th>
                <th>Tags</th>
            </thead>
            <tbody>
                <tr *ngFor="let result of resultItems">
                    <td>{{result.owner.display_name}}</td>
                    <td>{{result.title + '(' + result.answer_count + ')'}}</td>
                    <td><p *ngFor="let tag of result.tags">{{tag}}</p></td>
                </tr>
            </tbody>
        </table>
   </div>
   `
})
export class ResultsComponent implements OnInit, OnDestroy {
    private resultItems:any = [];
    private sub: Subscription;
    private searchSub: Subscription;

    constructor (private SearchService_:SearchService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.resultItems = this.SearchService_.getResultItems();
        if (this.resultItems.length === 0) {
            this.sub = this.route
                .queryParams
                .subscribe((params:any) => {
                    if(!params.query) {
                        this.router.navigate(['']);
                    } else {
                        this.searchSub = this.SearchService_.search(params.query).subscribe(
                            () => {
                                this.resultItems = this.SearchService_.getResultItems();
                            }
                        )
                    }
                });
        }
    }

    ngOnDestroy() {
        this.sub && this.sub.unsubscribe();
        this.searchSub && this.searchSub.unsubscribe();
    }
}