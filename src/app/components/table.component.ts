/// <reference path='../entities/table.d.ts' />

import {Component, Input} from '@angular/core';
import '../../assets/css/table.css';
import IColumns = entities.table.IColumns;

@Component({
    selector: 'resultsTable',
    template: `
        <table class="table">
            <thead>
                <tr class="table-row table-row--head">
                    <th *ngIf="columns.author.show" class="table-row__cell">Author</th>
                    <th *ngIf="columns.theme.show" class="table-row__cell">Themes(answers)</th>
                    <th *ngIf="columns.answers.show" class="table-row__cell">Answer Body</th>
                    <th *ngIf="columns.tags.show" class="table-row__cell">Tags</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let result of items" class="table-row">
                    <td *ngIf="columns.author.show" class="table-row__cell">
                        <a *ngIf="columns.author.clickable" [routerLink]="['author/'+result.owner.user_id]" queryParamsHandling="merge">{{result.owner.display_name}}</a>
                        <span *ngIf="!columns.author.clickable">{{result.owner.display_name}}</span>
                    </td>
                    <td *ngIf="columns.theme.show" class="table-row__cell">
                        <a *ngIf="columns.theme.clickable" [routerLink]="['/answers/'+result.question_id]" queryParamsHandling="merge">{{result.title + '(' + result.answer_count + ')'}}</a>
                        <span *ngIf="!columns.theme.clickable">{{result.title + '(' + result.answer_count + ')'}}</span>
                    </td>
                    <td *ngIf="columns.answers.show" class="table-row__cell table-row__cell--left-align" [innerHtml]="result.body"></td>
                    <td *ngIf="columns.tags.show" class="table-row__cell">
                        <span *ngFor="let tag of result.tags; let i = index">
                            <a *ngIf="columns.tags.clickable" [routerLink]="['tag/'+tag]" queryParamsHandling="merge">{{tag}}</a>
                            <span *ngIf="!columns.tags.clickable">{{tag}}<span *ngIf="i !== (result.tags.length - 1)">, </span></span>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    `
})
export class TableComponent {
    @Input() columns: IColumns;
    @Input() items:any;

    constructor() {
    }
}