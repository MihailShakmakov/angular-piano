import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import {StackOverflowConverter} from "./stackoverflow.converter";

@Injectable()
export class StackOverFlowService {
    private baseUrl:string = 'http://api.stackexchange.com/2.2/';
    private paths = {
        'search': 'search',
        'usersQuestions': 'users/<id>/questions',
        'searchAdvanced': 'search/advanced',
        'questionAnswers': 'questions/<id>/answers'
    };

    private filters = {
        'answersFilter': '!bJDurya-geHdVm'
    };
    private defaultParams:URLSearchParams = new URLSearchParams();
    private queryOptions:any = {
        order: 'desc',
        sort: 'activity',
        filter: 'default',
        site: 'stackoverflow',
        'key': 'U4DMV*8nvpm3EOpvf69Rxw(('
    };
    private searchItems:any = [];
    private questionItems:any = [];
    private tagItems:any = [];
    private answerItems:any = [];

    constructor(private http_:Http, private StackOverflowConverter_:StackOverflowConverter) {
        for(let option in this.queryOptions) {
            this.defaultParams.set(option, this.queryOptions[option]);
        }
    }

    private getUrlPath() {

    }

    public getQuestionsByKeyWord(query:string):Observable<string> {
        let params:URLSearchParams = this.defaultParams.clone();
        if(query && query.length) {
            params.set('intitle', query);

            return this.http_
                .get(this.baseUrl+this.paths.search, {search: params})
                .map(resp => resp.json())
                .map(jsonResp => {
                    let items = jsonResp.items;
                    this.searchItems = items && items.length ? items.map((item:any) => this.StackOverflowConverter_.convertItem(item)): [];
                    return this.searchItems;
                });
        }
        else {
            return Observable.throw('empty query');
        }
    }

    public getQuestionsByUser(userId:string):Observable<string> {
        let params:URLSearchParams = this.defaultParams.clone();
        return this.http_
            .get(this.baseUrl+this.paths.usersQuestions.replace(/<id>/g, userId), {search: params})
            .map(resp => resp.json())
            .map(jsonResp => {
                let items = jsonResp.items;
                this.questionItems = items && items.length ? items.map((item:any) => this.StackOverflowConverter_.convertItem(item)): [];
                return this.questionItems;
            });
    }

    public getQuestionsByTag(tag:string):Observable<string> {
        let params:URLSearchParams = this.defaultParams.clone();
        params.set('tagged', tag);
        return this.http_
            .get(this.baseUrl+this.paths.searchAdvanced, {search: params})
            .map(resp => resp.json())
            .map(jsonResp => {
                let items = jsonResp.items;
                this.tagItems = items && items.length ? items.map((item:any) => this.StackOverflowConverter_.convertItem(item)): [];
                return this.tagItems;
            });
    }

    public getAnswers(questionId:string):Observable<string> {
        let params:URLSearchParams = this.defaultParams.clone();
        params.set('filter', this.filters.answersFilter);
        return this.http_
            .get(this.baseUrl+this.paths.questionAnswers.replace(/<id>/g, questionId), {search: params})
            .map(resp => resp.json())
            .map(jsonResp => {
                let items = jsonResp.items;
                this.answerItems = items && items.length ? items.map((item:any) => this.StackOverflowConverter_.convertAnswerItem(item)): [];
                return this.answerItems;
            });
    }

    public getResultItems() {
        return this.searchItems;
    }

    public getQuestionItems() {
        return this.questionItems;
    }

    public getTagItems() {
        return this.tagItems;
    }

    public getAnswerItems() {
        return this.answerItems;
    }
}