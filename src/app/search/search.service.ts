import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {SearchConverter} from "./search.converter";

@Injectable()
export class SearchService {
    private baseUrl:string = 'http://api.stackexchange.com/2.2/search';
    private defaultParams:URLSearchParams = new URLSearchParams();
    private queryOptions:any = {
        order: 'desc',
        sort: 'activity',
        filter: 'default',
        site: 'stackoverflow'
    };
    private resultItems:any = [];

    constructor(private http_:Http, private SearchConverter_:SearchConverter) {
        for(let option in this.queryOptions) {
            this.defaultParams.set(option, this.queryOptions[option]);
        }
    }

    public search(query:string):Observable<string> {
        let params:URLSearchParams = this.defaultParams.clone();
        params.set('intitle', query);

        return this.http_
            .get(this.baseUrl, {search: params})
            .map(resp => resp.json())
            .map(jsonResp => {
                let items = jsonResp.items;
                this.resultItems = items && items.length ? items.map((item:any) => this.SearchConverter_.convertItem(item)): [];
                return this.resultItems;
            });
    }
    
    public getResultItems() {
        return this.resultItems;
    }
}