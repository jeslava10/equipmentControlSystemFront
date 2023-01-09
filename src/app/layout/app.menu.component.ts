import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService ) { }

    ngOnInit() {
        this.model = [
            {
                label: 'UI Components',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Schools', icon: 'pi pi-fw pi-home', routerLink:['school']},
                    { label: 'Users', icon: 'pi pi-fw pi-users',   routerLink:['users'] },
                    { label: 'Orders', icon: 'pi pi-fw pi-book',    routerLink:['orders']},
                    { label: 'Diary', icon: 'pi pi-fw pi-calendar', routerLink:['diary']},
                      
                ]
            }
        ];
    }

}
