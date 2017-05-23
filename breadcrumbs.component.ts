import { Component, OnInit } from '@angular/core'
import { filterOnInstanceType, log, toWindow as tW } from '../../../utils/helpers-streams'
import { Observable } from 'rxjs/Observable'
import { NavigationEnd, Router } from '@angular/router'


@Component({
    selector: 'v-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
    private breadcrumbs$: Observable<string>

    constructor(router: Router) {
        this.breadcrumbs$ = router.events[filterOnInstanceType](NavigationEnd)
            .pluck('url')
            .map((url) => url
                .replace('/', '') // remove trailing slash from url
                .split('/')
                .reduce((acc, curr) =>
                    ({
                        all: acc.all + '/' + curr,
                        data: [...acc.data, {
                            name: curr,
                            path: acc.all + '/' + curr
                        }]
                    }), {all: '', data: []}))
            .pluck('data')
    }
}
