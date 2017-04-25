import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {SearchService} from '../services/search.service';

@Component({
    styles: [`
        * {
         box-sizing: border-box;
        }
       .container {
        display: flex;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
       }
       .search-bar {
        position: relative;
        margin: auto;
        font-size: 0;
        width: 40%;
        min-width: 100px;
        padding-right: 50px;
        min-height: 100px;
       } 
       .search-bar__field {
        height: 40px;
        border-radius: 4px 0 0 4px;
        border: 1px solid #ccc;
        width: 100%;
        padding:0 .5em;
        font-size: 16px;
       }
       .search-bar__button {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 16px;
        border-radius: 0 4px 4px 0;
        height: 40px;
        width: 50px;
        border: 1px solid #ccc;
       }
       .search-bar__error {
        font-size: 16px;
        color: red;
        padding: 10px;
       }
    `],
    template: `
        <div class="container">
            <div class="search-bar">
                <input [formControl]="searchField" placeholder="Search..." class="search-bar__field" type="text"/> 
                <button class="search-bar__button" (click)="submitSearch()">Go</button>
                <div class="search-bar__error" *ngIf="error.length" [(innerHtml)]="error" >
                    
                </div>
            </div>
        </div>
    `
})
export class SearchComponent {
    public searchField: FormControl = new FormControl(null, Validators.required);
    public error:string = '';

    constructor(private SearchService_:SearchService) {

    }

    ngOnInit(): void {
        this.searchField.valueChanges
            .debounceTime(200)
            .distinctUntilChanged()
            .map((query:string) => query.trim())
            .subscribe((query:string) => {
                // console.log(query);
                console.log(this.SearchService_.search(query));
            })
    }

    public submitSearch(): void {
        if(this.searchField.valid) {
            this.error = ''
        }
        else {
            this.error = 'введи что-нибудь!';
        }
    }
}