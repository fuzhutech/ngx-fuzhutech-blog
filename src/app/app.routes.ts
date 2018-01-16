import {RouterModule} from '@angular/router';

export const appRoutes = [
    {path: 'home', redirectTo: '', pathMatch: 'full'},
    {
        path: '',
        loadChildren: './post/post.module#PostModule'
    },
    {
        path: 'posts',
        loadChildren: './post/post.module#PostModule'
    },
    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
    },
    {
        path: 'manage',
        loadChildren: './manage/manage.module#ManageModule'
    },
    {
        path: '**', // fallback router must in the last
        redirectTo: '',
        pathMatch: 'full'
    }
];
