import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AccordionModule, PaginationModule, AlertModule} from 'ng2-bootstrap';
import {DropdownModule} from 'ng2-bootstrap';

import {SharedModule} from '../shared/shared.module';
import {ManageMainComponent} from './manage-main/manage-main.component';
import {UserTableComponent} from './user-table/user-table.component';
import {SysParamComponent} from './sys-param/sys-param.component';
import {WritePostComponent} from './write-post/write-post.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {PostTableComponent} from './post-table/post-table.component';
import {CommentTableComponent} from './comment-table/comment-table.component';

import {AuthGuard} from './auth-guard';

import {UEditorModule} from '../ueditor';

import {manageRoutes} from './manage.routes';

@NgModule({
  declarations: [
    ManageMainComponent,
    UserTableComponent,
    SysParamComponent,
    WritePostComponent,
    UserProfileComponent,
    PostTableComponent,
    CommentTableComponent
  ],
  imports: [
    CommonModule,
    // AccordionModule,
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    DropdownModule,
    SharedModule,
    UEditorModule.forRoot({
      // 指定ueditor.js路径目录
      path: 'assets/ueditor1_4_3_3-utf8-jsp/',
      // 默认全局配置项
      options: {
        themePath: '/assets/ueditor1_4_3_3-utf8-jsp/themes/'
      }
    }),
    RouterModule.forChild(manageRoutes)
  ],
  exports: [
    ManageMainComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class ManageModule {
}
