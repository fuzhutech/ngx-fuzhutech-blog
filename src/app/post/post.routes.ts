import {RouterModule} from '@angular/router';
import {PostHomeComponent} from './post.component';
import {PostDetailMainComponent} from './post-detail-main/post-detail-main.component';

export const postRoutes = [
  {
    path: '',
    component: PostHomeComponent,
  },
  {
    path: 'p/:postId',
    component: PostDetailMainComponent
  }
];
