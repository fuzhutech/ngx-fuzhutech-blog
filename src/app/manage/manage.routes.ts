import {ManageMainComponent} from './manage-main/manage-main.component';
import {PostTableComponent} from './post-table/post-table.component';
import {CommentTableComponent} from './comment-table/comment-table.component';
import {UserTableComponent} from './user-table/user-table.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {SysParamComponent} from './sys-param/sys-param.component';
import {WritePostComponent} from './write-post/write-post.component';
import {AuthGuard} from './auth-guard';

export const manageRoutes = [
  {
    path: '',
    component: ManageMainComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'posts', pathMatch: 'full'},
      {path: 'posts', component: PostTableComponent},
      {path: 'write', component: WritePostComponent},
      {path: 'p/:postId/edit', component: WritePostComponent},
      {path: 'comments', component: CommentTableComponent},
      {path: 'users', component: UserTableComponent},
      {path: 'users/create', component: UserProfileComponent},
      {path: 'users/edit/:userId', component: UserProfileComponent},
      {path: 'sysparam', component: SysParamComponent},
      {path: '**', redirectTo: 'posttable/page/1'}
    ]
  }
];
