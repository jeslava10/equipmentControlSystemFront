import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { SchoolComponent } from './pages/school/school.component';
import { UsersComponent } from './pages/users/users.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { DiaryComponent } from './pages/diary/diary.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'school', component: SchoolComponent },
                    { path: 'users', component: UsersComponent },
                    { path: 'orders', component: OrdersComponent },
                    { path: 'diary', component: DiaryComponent },
                ]
            },
            { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ]
        , { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}