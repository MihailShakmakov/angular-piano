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
                    <th *ngIf="columns.tags.show" class="table-row__cell">Tags</th>
                </tr>
            </thead>
            <tbody>
            <tr *ngFor="let result of items" class="table-row">
                <td *ngIf="columns.author.show" class="table-row__cell">
                    <a *ngIf="columns.author.clickable" [routerLink]="[result.owner.user_id]" preserveQueryParams="true">{{result.owner.display_name}}</a>
                    <span *ngIf="!columns.author.clickable">{{result.owner.display_name}}</span>
                </td>
                <td *ngIf="columns.theme.show" class="table-row__cell">
                    <a *ngIf="columns.theme.clickable" [routerLink]="[result.owner.user_id]" preserveQueryParams="true">{{result.title + '(' + result.answer_count + ')'}}</a>
                    <span *ngIf="!columns.theme.clickable">{{result.title + '(' + result.answer_count + ')'}}</span>
                </td>
                <td *ngIf="columns.tags.show" class="table-row__cell">
                    <span *ngFor="let tag of result.tags; let i = index">
                        {{tag}}<span *ngIf="i !== (result.tags.length - 1)">, </span>
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