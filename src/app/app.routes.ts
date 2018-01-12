import {RouterModule} from '@angular/router';

import {LoginComponent, ForgetPwdComponent} from './login';

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
    component: LoginComponent
  },
  {
    path: 'forgetpwd',
    component: ForgetPwdComponent
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
