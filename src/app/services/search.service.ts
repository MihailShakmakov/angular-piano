import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class SearchService {
    private baseUrl:string = 'http://api.stackexchange.com/2.2/search';
    private defaultParams:URLSearchParams = new URLSearchParams();

    constructor(private http_:Http) {
        this.defaultParams.set('order', 'desc');
        this.defaultParams.set('sort', 'activity');
        this.defaultParams.set('filter', 'default');
        this.defaultParams.set('site', 'stackoverflow');
    }

    search(query:string):Observable<string> {
        let params = new Map([...this.defaultParams]);
        params.set('intitle', query);
        
        return this.http_
            .get(this.baseUrl, {search: params})
            .map((resp: Response) => resp.json())
    }
}