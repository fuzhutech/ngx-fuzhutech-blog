export class Post {
  id: number;
  title: string;
  excerpt: string;
  categoryId: number;
  status: number;
  readCount: number;
  commentCount: number;
  enableComment: number;
  userId: number;
  userName: string;
  nickName: string;
  createTime: Date;
  lastModifyTime: Date;
  content: string;

  toggle_expand: Boolean;
}
