import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { Page404Component } from './page404.component';
import { QuickViewComponent } from './quickView/quick-view.component';
import { SearchService } from './search/search.service';
import { SearchConverter } from './search/search.converter';
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
            {path: ':authorId', component: QuickViewComponent}
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
        SearchComponent,
        ResultsComponent,
        QuickViewComponent,
        Page404Component,
        AppComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        SearchConverter,
        SearchService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }


