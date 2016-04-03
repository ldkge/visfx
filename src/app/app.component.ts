import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';

import {ElasticsearchService} from './elasticsearch.service'
import {TimeResolution} from './time-resolution'
import {LineChartComponent} from './line-chart.component';

@Component({
    selector: 'app',
    templateUrl: 'app/app.component.html',
    styles: [`
        chart {
            display: block;
        }
    `],
    providers: [
        HTTP_PROVIDERS,
        ElasticsearchService,
    ],
    directives: [LineChartComponent]
})
export class AppComponent implements OnInit {
    health = 'Loading';
    errorMessage: string;
    res: Object;

    constructor(private _es: ElasticsearchService) { }

    ngOnInit() {
        this._es.getHealthString()
            .subscribe(
            health => this.health = health,
            error => this.errorMessage = <any>error);

        // let query = {
        //     "query": {
        //         "match": {
        //             "currency_pair": "EUR/USD"
        //         }
        //     }
        // }
        //
        // this._es.search(query, 'forex', 'history')
            // .subscribe(
            //     res => this.res = res,
            //     error => this.errorMessage = <any>error
            // );

        this._es.getHistory(
            'EUR/USD',
            '2015-01-01', '2015-12-31',
            TimeResolution.W1)
            .subscribe(
                res => this.res = res,
                error => this.errorMessage = <any>error
            );
    }
}
