import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { Page404Component } from './page404.component';
import { QuestionsComponent } from './questions/questions.component'
import { TableComponent } from "./components/table.component";
import { StackOverFlowService } from './services/stackoverflow.service';
import { StackOverflowConverter } from './services/stackoverflow.converter';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { HttpModule } from "@angular/http";

const appRoutes:Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: SearchComponent
    },
    {
        path: 'results',
        component: ResultsComponent,
        children: [
            {path: ':authorId', component: QuestionsComponent}
        ]
    },
    {
        path: '**',
        component: Page404Component
    }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        HttpModule
    ],
    declarations: [
        TableComponent,
        SearchComponent,
        ResultsComponent,
        QuestionsComponent,
        Page404Component,
        AppComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        StackOverflowConverter,
        StackOverFlowService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }


