import {Injectable} from '@angular/core';
import * as _ from "lodash";

@Injectable()
export class StackOverflowConverter {
    
    public convertItem(item:any):any {
        return {
            owner: _.pick(item.owner, ['user_id', 'display_name']),
            ... _.pick(item, ['tags', 'answer_count', 'title', 'question_id'])
        }
    }

    public convertAnswerItem(item:any):any {
        return {
            owner: _.pick(item.owner, ['user_id', 'display_name']),
            ... _.pick(item, ['body', 'score', 'title'])
        }
    }
}