import { Component } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { NavigationEnd, Router } from '@angular/router'

const textForHomePage = 'home';

@Component({
    selector: 'breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
    private breadcrumbs$: Observable<{name, path}>

    constructor(router: Router) {
        this.breadcrumbs$ = router.events
            .filter((routerEvent) => routerEvent instanceof NavigationEnd)
            .mapTo(router.url
                .replace('/', '') // remove trailing slash from url
                .split('/')
                .reduce((acc, curr) =>
                    ([...acc, {
                            name: curr,
                            path: acc.slice(-1)[0].path + '/' + curr
                    }]), [{name: textForHomePage, path: ''}])
                .slice(1))
    }
}
